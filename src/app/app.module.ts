import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// Environment
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
// External Modules
import { NgxProfileAvatarModule } from '@michaelldev/ngx-profile-avatar';
import { AngularSvgIconModule } from 'angular-svg-icon';
// Routing
import { AppRoutingModule } from './app.routing';
// Modules
import { UiModule } from './ui/ui.module';
// Components
import { AppComponent } from './app.component';
// Child Components
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { CertificationsPageComponent } from './pages/certifications-page/certifications-page.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    UiModule,
    NgxProfileAvatarModule,
    AngularSvgIconModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    OverviewPageComponent,
    ProjectsPageComponent,
    CertificationsPageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
