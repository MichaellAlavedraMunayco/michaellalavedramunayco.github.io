import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// rxjs
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
// components
import { CertificationsPageComponent } from './pages/certifications-page/certifications-page.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';

type Path = 'overview' | 'projects' | 'certifications';
type PageComponent = OverviewPageComponent | ProjectsPageComponent | CertificationsPageComponent;

class Page {

  scrollRef: number;
  path: Path;
  title: string;
  component: PageComponent;
  previousPage: Page;
  nextPage: Page;

  constructor({ path, title, component }: Partial<Page>) {
    this.path = path;
    this.title = title;
    this.component = component;
    this.scrollRef = this.getScrollRef();
  }


  getScrollRef(): number {
    return this.component.getBoundingClientRect().y;
  }

  setScrollRef() {
    this.scrollRef = this.getScrollRef();
  }

  setSiblingPages(previous: Page, next: Page) {
    this.previousPage = previous;
    this.nextPage = next;
  }

  scrollIntoView() {
    this.component.scrollIntoView();
  }

  setTitle() {
    document.title = this.title;
  }
}

class PageController {

  method: 'onprevious' | 'onnext';
  currentPage: Page;

  map: Map<Path, Page> = new Map<Path, Page>();
  stack: Page[] = [];

  constructor() {
    this.method = 'onprevious';
  }

  init(pages: Page[]) {

    this.stack = pages;

    pages.forEach(page => {
      this.map.set(page.path, page);
    });
  }

  get(path: Path): Page {
    return this.map.get(path);
  }

  safePath(path: string): Path {
    return ['projects', 'certifications'].includes(path) ? path as Path : 'overview';
  }

  setMethod(method: 'onprevious' | 'onnext') {
    this.method = method;
  }

  setCurrentPage(page: Page): void {

    if (!page) return;

    this.orderPages();

    this.currentPage = page;
    this.currentPage.setTitle();
    this.currentPage.scrollIntoView();

  }

  private orderPages() {

    if (this.method === 'onprevious') {

      const lastPage = this.stack.pop();
      this.stack.unshift(lastPage);

      lastPage.component.moveToFirst();
    }

    if (this.method === 'onnext') {

      const firstPage = this.stack.shift();
      this.stack.push(firstPage);

      firstPage.component.moveToLast();
    }
  }

}

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {

  @ViewChild(OverviewPageComponent) overviewPage: OverviewPageComponent;
  @ViewChild(ProjectsPageComponent) projectsPage: ProjectsPageComponent;
  @ViewChild(CertificationsPageComponent) certificationsPage: CertificationsPageComponent;

  pageController: PageController = new PageController();

  routerSubscription: Subscription;
  // scrollSubscription: Subscription;


  constructor(
    // private elementRef: ElementRef<HTMLElement>,
    private router: Router,
  ) {

    this.routerSubscription = this.router.events
      .pipe(
        filter<NavigationEnd>(event => event instanceof NavigationEnd),
        map(event => event.url.replace('/', '')),
      )
      .subscribe(param => {

        const path = this.pageController.safePath(param);
        const page = this.pageController.get(path);

        this.pageController.setCurrentPage(page);
      });

    // this.scrollSubscription = fromEvent(this.elementRef.nativeElement, 'scroll')
    //   .pipe(
    //     debounceTime(100),
    //     distinctUntilChanged(),
    //     map(() => this.elementRef.nativeElement.scrollTop),
    //   )
    //   .subscribe(scrollTop => {
    //     this.page = Array.from(this.pageMap.values()).find(({ scrollRef }) => scrollRef === scrollTop) || this.pageMap.get('overview');
    //     this.router.navigate([this.page.path]);
    //   });
  }

  ngAfterViewInit(): void {

    const overviewPage = new Page({
      path: 'overview',
      title: 'Michaell Alavedra',
      component: this.overviewPage,
    });

    const projectsPage = new Page({
      path: 'projects',
      title: 'Projects of Michaell Alavedra',
      component: this.projectsPage,
    });

    const certificationsPage = new Page({
      path: 'certifications',
      title: 'Certifications of Michaell Alavedra',
      component: this.certificationsPage,
    });

    overviewPage.setSiblingPages(certificationsPage, projectsPage);
    projectsPage.setSiblingPages(overviewPage, certificationsPage);
    certificationsPage.setSiblingPages(projectsPage, overviewPage);

    this.pageController.init([
      overviewPage,
      projectsPage,
      certificationsPage,
    ]);

  }

  onGoToPreviousPage() {
    this.pageController.setMethod('onprevious');
    this.router.navigate([this.pageController.currentPage.previousPage.path]);
  }

  onGoToNextPage() {
    this.pageController.setMethod('onnext');
    this.router.navigate([this.pageController.currentPage.nextPage.path]);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    // this.scrollSubscription.unsubscribe();
  }

}
