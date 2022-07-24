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


  constructor(private router: Router) {

    this.routerSubscription = this.router.events
      .pipe(
        distinct(),
        filter<NavigationEnd>(event => event instanceof NavigationEnd),
      )
      .subscribe(({ url }) => {

        const page = this.pageController.getPage({ url });

        this.pageController.setPage(page);
        this.pageController.navigate();
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

    overviewPage.siblings({
      'previous': certificationsPage,
      'next': projectsPage,
    });

    projectsPage.siblings({
      'previous': overviewPage,
      'next': certificationsPage,
    });

    certificationsPage.siblings({
      'previous': projectsPage,
      'next': overviewPage,
    });

    this.pageController.setPage(overviewPage);

    this.pageController.setStack([overviewPage, projectsPage, certificationsPage]);
  }

  onGoToPage(pageEvent: PageEvent) {

    this.pageController.setEvent(pageEvent);

    const page = this.pageController.getPage({ pageEvent });

    this.router.navigate([page.path]);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
