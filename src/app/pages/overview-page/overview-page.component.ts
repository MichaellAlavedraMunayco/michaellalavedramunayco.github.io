import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { PageComponent } from 'src/app/core/models/page-component';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.less'],
})
export class OverviewPageComponent extends PageComponent implements OnInit {

  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  loadPercent: number = 0;
  // timeoutId: number;

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  ngOnInit(): void {
    // const self = this;
    // (function load() {
    //   if (self.loadPercent === 100) {
    //     window.clearTimeout(self.timeoutId);
    //     return;
    //   }
    //   self.loadPercent++;
    //   self.timeoutId = window.setTimeout(load, 10);
    // })();
  }

  onLoadingAvatar({ loaded, total }: ProgressEvent) {
    this.loadPercent = loaded / total * 100;
  }

}
