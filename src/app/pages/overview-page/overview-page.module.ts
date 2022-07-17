import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewPageComponent } from './overview-page.component';
import { OverviewPageRoutingModule } from './overview-page.routing';
// import { NgxProfileAvatarModule } from '@michaelldev/ngx-profile-avatar';



@NgModule({
  imports: [
    CommonModule,
    OverviewPageRoutingModule,
    // NgxProfileAvatarModule,
  ],
  declarations: [OverviewPageComponent],
  exports: [OverviewPageComponent]
})
export class OverviewPageModule { }
