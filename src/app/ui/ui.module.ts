import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
// Component
import { CursorComponent } from './cursor/cursor.component';
import { TypographyDirective } from './typography/typography.directive';
import { ProgressComponent } from './progress/progress.component';
import { ButtonComponent } from './button/button.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CursorComponent,
    ProgressComponent,
    TypographyDirective,
    ButtonComponent,
  ],
  exports: [
    CursorComponent,
    ProgressComponent,
    TypographyDirective,
    ButtonComponent,
  ],
})
export class UiModule { }
