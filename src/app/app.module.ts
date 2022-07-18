import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Environment
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
// External Modules
import { NgxProfileAvatarModule } from '@michaelldev/ngx-profile-avatar';
// Routing
import { AppRoutingModule } from './app.routing';
// Components
import { AppComponent } from './app.component';
// Child Components
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { CertificationsPageComponent } from './pages/certifications-page/certifications-page.component';


@NgModule({
  declarations: [
    AppComponent,
    OverviewPageComponent,
    ProjectsPageComponent,
    CertificationsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxProfileAvatarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
