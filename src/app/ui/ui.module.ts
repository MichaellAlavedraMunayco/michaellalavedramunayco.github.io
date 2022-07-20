import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
// Component
import { CursorComponent } from './cursor/cursor.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CursorComponent,
  ],
  exports: [
    CursorComponent,
  ],
})
export class UiModule { }
