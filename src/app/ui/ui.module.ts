import { NgModule } from '@angular/core';
// External  Module
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';
import * as Icon from './icon/icons.json';
// Module
import { CommonModule } from '@angular/common';
// Component
import { CursorComponent } from './cursor/cursor.component';
import { TypographyDirective } from './typography/typography.directive';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ButtonComponent } from './button/button.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ButtonTabComponent } from './button-tab/button-tab.component';
import { TagComponent } from './tag/tag.component';



@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule,
  ],
  declarations: [
    CursorComponent,
    TypographyDirective,
    ProgressBarComponent,
    BreadcrumbComponent,
    ButtonComponent,
    ButtonTabComponent,
    TagComponent,
  ],
  exports: [
    CursorComponent,
    TypographyDirective,
    ProgressBarComponent,
    BreadcrumbComponent,
    ButtonComponent,
    ButtonTabComponent,
    TagComponent,
  ],
  providers: [
    SvgIconRegistryService,
  ]
})
export class UiModule {

  constructor(private iconsService: SvgIconRegistryService) {

    Object.entries(Icon[0]).forEach(([key, svg]) => {
      this.iconsService.addSvg(key, svg);
    })
  }

}
