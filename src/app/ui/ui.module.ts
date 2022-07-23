import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
// Component
import { CursorComponent } from './cursor/cursor.component';
import { TypographyDirective } from './typography.directive';
import { ProgressComponent } from './progress/progress.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CursorComponent,
    ProgressComponent,
    TypographyDirective,
  ],
  exports: [
    CursorComponent,
    ProgressComponent,
    TypographyDirective,
  ],
})
export class UiModule { }
