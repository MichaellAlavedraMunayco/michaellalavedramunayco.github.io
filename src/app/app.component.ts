import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// rxjs
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged, filter } from 'rxjs/operators';
// components
import { CertificationsPageComponent } from './pages/certifications-page/certifications-page.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';

type Path = 'overview' | 'projects' | 'certifications';
type PageComponent = OverviewPageComponent | ProjectsPageComponent | CertificationsPageComponent;
type PageEvent = 'onprevious' | 'onnext';
type PageParams = { url?: string, scrollRef?: number, deltaY?: number, key?: string };

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

  updateScrollRef() {
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

  page: Page;
  private event: PageEvent = 'onprevious';
  private stack: Page[] = [];

  lastScrollRef: number = 0;

  constructor() { }

  setPage(page: Page) {
    this.page = page;
  }

  setEvent(event: PageEvent) {
    this.event = event;
  }

  setStack(stack: Page[]) {
    this.stack = stack;
  }

  toPath(url: string): Path {
    const path = url.replace('/', '');
    return ['projects', 'certifications'].includes(path)
      ? path as Path
      : 'overview';
  }

  findPage({ url, scrollRef }: PageParams): Page {
    if (url) {
      const path = this.toPath(url);
      return this.stack.find(page => page.path === path);
    }
    if (scrollRef)
      return this.stack.find(page => page.scrollRef === scrollRef);
  }

  getEventBy({ scrollRef, key, deltaY }: PageParams): PageEvent {

    if (scrollRef)
      return scrollRef > this.lastScrollRef ? 'onnext' : 'onprevious';

    if (deltaY)
      return deltaY > 0 ? 'onnext' : 'onprevious';

    if (key)
      return {
        'ArrowDown': 'onnext',
        'ArrowUp': 'onprevious'
      }[key] as PageEvent;
  }

  navigate() {

    if (!this.page) return;

    this.updatePagesOrder();

    this.page.setTitle();
    this.page.scrollIntoView();
  }

  private updatePagesOrder() {

    if (!this.event) return;

    if (this.event === 'onprevious') {

      const lastPage = this.stack.pop();
      this.stack.unshift(lastPage);

      lastPage.component.moveToFirst();
    }

    if (this.event === 'onnext') {

      const firstPage = this.stack.shift();
      this.stack.push(firstPage);

      firstPage.component.moveToLast();
    }

  }

}

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements AfterViewInit, OnDestroy {

  @ViewChild(OverviewPageComponent) overviewPage: OverviewPageComponent;
  @ViewChild(ProjectsPageComponent) projectsPage: ProjectsPageComponent;
  @ViewChild(CertificationsPageComponent) certificationsPage: CertificationsPageComponent;

  pageController: PageController = new PageController();

  routerSubscription: Subscription;
  keySubscription: Subscription;


  constructor(
    private router: Router,
  ) {

    this.routerSubscription = this.router.events
      .pipe(
        distinct(),
        filter<NavigationEnd>(event => event instanceof NavigationEnd),
      )
      .subscribe(({ url }) => {

        const page = this.pageController.findPage({ url });

        this.pageController.setPage(page);
        this.pageController.navigate();
      });


    this.keySubscription = merge(
      fromEvent<KeyboardEvent>(document, 'keydown'),
      fromEvent<KeyboardEvent>(document, 'keyup'),
    )
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        filter(({ key, repeat }) => ['ArrowDown', 'ArrowUp'].includes(key) && !repeat),
      )
      .subscribe(event => {

        event.preventDefault();

        const { key } = event;

        const pageEvent = this.pageController.getEventBy({ key });

        this.onGoToPage(pageEvent);

      });
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

    this.pageController.setPage(overviewPage);

    this.pageController.setStack([
      overviewPage,
      projectsPage,
      certificationsPage,
    ]);
  }

  onGoToPage(pageEvent: PageEvent) {

    const page = {
      ['onprevious']: this.pageController.page.previousPage,
      ['onnext']: this.pageController.page.nextPage,
    }[pageEvent];

    this.pageController.setEvent(pageEvent);

    this.router.navigate([page.path]);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.keySubscription.unsubscribe();
  }

}
