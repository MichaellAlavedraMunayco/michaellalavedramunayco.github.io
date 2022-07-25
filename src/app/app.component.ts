import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
// services
import { NavigationService, Page, PageStack } from './core/services/navigation.service';
// components
import { CertificationsPageComponent } from './pages/certifications-page/certifications-page.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
// models


@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements AfterViewInit, OnDestroy {

  @ViewChild(OverviewPageComponent) overviewPage: OverviewPageComponent;
  @ViewChild(ProjectsPageComponent) projectsPage: ProjectsPageComponent;
  @ViewChild(CertificationsPageComponent) certificationsPage: CertificationsPageComponent;


  constructor(public navigator: NavigationService) { }

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
      previous: certificationsPage,
      next: projectsPage,
    });

    projectsPage.siblings({
      previous: overviewPage,
      next: certificationsPage,
    });

    certificationsPage.siblings({
      previous: projectsPage,
      next: overviewPage,
    });

    this.navigator
      .setStack(new PageStack()
        .start(overviewPage)
        .add(projectsPage)
        .end(certificationsPage));
  }

  ngOnDestroy(): void {
    this.navigator.unsubscribe();
  }

}
