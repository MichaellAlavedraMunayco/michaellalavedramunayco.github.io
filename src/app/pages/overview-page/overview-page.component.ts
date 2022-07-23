import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.less'],
})
export class OverviewPageComponent implements OnInit {

  @Output() nextPage = new EventEmitter<boolean>();

  loadPercent: number = 0;

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
  }

  getBoundingClientRect() {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  onLoadingAvatar({ loaded, total }: ProgressEvent) {
    this.loadPercent = loaded / total * 100;
  }

}
