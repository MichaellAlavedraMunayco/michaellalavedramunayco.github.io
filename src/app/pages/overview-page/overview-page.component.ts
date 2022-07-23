import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.less'],
})
export class OverviewPageComponent implements OnInit {

  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  loadPercent: number = 0;
  timeoutId: number;

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    const self = this;
    (function load() {
      if (self.loadPercent === 100) {
        window.clearTimeout(self.timeoutId);
        return;
      }
      self.loadPercent++;
      self.timeoutId = window.setTimeout(load, 10);
    })();
  }

  getBoundingClientRect() {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  moveToFirst() {
    const node = this.elementRef.nativeElement;
    const parentNode = this.elementRef.nativeElement.parentNode;

    parentNode.removeChild(node);
    parentNode.prepend(node);
  }

  moveToLast() {
    const node = this.elementRef.nativeElement;
    const parentNode = this.elementRef.nativeElement.parentNode;

    parentNode.removeChild(node);
    parentNode.append(node);
  }

  onLoadingAvatar({ loaded, total }: ProgressEvent) {
    this.loadPercent = loaded / total * 100;
  }

}
