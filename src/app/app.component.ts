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
  private nextPage: Page;

  constructor({ path, title, component }: Partial<Page>) {
    this.path = path;
    this.title = title;
    this.component = component;
    this.scrollRef = this.getScrollRef();
  }


  getScrollRef(): number {
    return this.component.getBoundingClientRect().y;
  }

  setNextPage(nextPage: Page) {
    this.nextPage = nextPage;
  }

  getNextPage(): Page {
    return this.nextPage;
  }

  scrollIntoView() {
    this.component.scrollIntoView();
  }

  updateDeviceTitle() {
    document.title = this.title;
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

  pageMap: Map<Path, Page> = new Map<Path, Page>();
  path: Path;
  page: Page;

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
        this.path = ['projects', 'certifications'].includes(param) ? param as Path : 'overview';
        this.page = this.pageMap.get(this.path);
        this.page?.scrollIntoView();
        this.page?.updateDeviceTitle();
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

    overviewPage.setNextPage(projectsPage);
    projectsPage.setNextPage(certificationsPage);
    certificationsPage.setNextPage(overviewPage);

    this.pageMap.set(overviewPage.path, overviewPage);
    this.pageMap.set(projectsPage.path, projectsPage);
    this.pageMap.set(certificationsPage.path, certificationsPage);

  }

  onGoToNextPage() {
    this.page = this.page.getNextPage();
    this.router.navigate([this.page.path]);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    // this.scrollSubscription.unsubscribe();
  }

}
