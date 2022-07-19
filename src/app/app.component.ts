import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// rxjs
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
// components
import { CertificationsPageComponent } from './pages/certifications-page/certifications-page.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';

type Path = 'overview' | 'projects' | 'certifications';
type PageComponent = OverviewPageComponent | ProjectsPageComponent | CertificationsPageComponent;

class Page {

  public scrollRef: number;
  private nextPage: Page;

  constructor(
    public path: Path,
    public component: PageComponent
  ) {
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
  scrollSubscription: Subscription;


  constructor(
    private elementRef: ElementRef<HTMLElement>,
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
        this.page.component.scrollIntoView();
      });

    this.scrollSubscription = fromEvent(this.elementRef.nativeElement, 'scroll')
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        map(() => this.elementRef.nativeElement.scrollTop),
      )
      .subscribe(scrollTop => {
        this.page = Array.from(this.pageMap.values()).find(({ scrollRef }) => scrollRef === scrollTop) || this.pageMap.get('overview');
        this.router.navigate([this.page.path]);
        document.title = this.page.path; // TODO Custom title
      });
  }

  ngAfterViewInit(): void {

    const overviewPage = new Page('overview', this.overviewPage);
    const projectsPage = new Page('projects', this.projectsPage);
    const certificationsPage = new Page('certifications', this.certificationsPage);

    overviewPage.setNextPage(projectsPage);
    projectsPage.setNextPage(certificationsPage);
    certificationsPage.setNextPage(overviewPage);

    this.pageMap.set(overviewPage.path, overviewPage);
    this.pageMap.set(projectsPage.path, projectsPage);
    this.pageMap.set(certificationsPage.path, certificationsPage);

  }

  onScrollToNextPage() {
    this.page = this.page.getNextPage();
    this.router.navigate([this.page.path]);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.scrollSubscription.unsubscribe();
  }

}
