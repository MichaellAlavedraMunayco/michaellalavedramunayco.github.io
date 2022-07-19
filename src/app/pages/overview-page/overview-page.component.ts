import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css'],
})
export class OverviewPageComponent implements OnInit {

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
  }

  getBoundingClientRect() {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  onLoadingAvatar(_: ProgressEvent) {
    // console.log(event);
  }

}
