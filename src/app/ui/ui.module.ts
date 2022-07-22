import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
// Component
import { CursorComponent } from './cursor/cursor.component';
import { TypographyDirective } from './typography.directive';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CursorComponent,
    TypographyDirective,
  ],
  exports: [
    CursorComponent,
    TypographyDirective,
  ],
})
export class UiModule { }
