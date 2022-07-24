import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// rxjs
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged, filter } from 'rxjs/operators';
// components
import { CertificationsPageComponent } from './pages/certifications-page/certifications-page.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
// models
import { Page, PageController, PageEvent } from './core/models/page-component';


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

    const page = this.pageController.getPageFromEvent(pageEvent);

    this.pageController.setEvent(pageEvent);

    this.router.navigate([page.path]);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.keySubscription.unsubscribe();
  }

}
