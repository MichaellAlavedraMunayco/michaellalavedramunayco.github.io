import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { delay, distinct, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ui-tab-set',
  template: `
    <div class="arrow-container" [class.show]="showArrowLeft" (click)="onScrollTo('left')">
      <div class="arrow-button">
        <svg-icon name="arrow-left" svgClass="arrow-icon"></svg-icon>
      </div>
    </div>

    <div #tabsRef class="tab-container">
      <ng-content></ng-content>
    </div>

    <div class="arrow-container" [class.show]="showArrowRight" (click)="onScrollTo('right')">
      <div class="arrow-button">
        <svg-icon name="arrow-right" svgClass="arrow-icon"></svg-icon>
      </div>
    </div>
  `,
  styleUrls: ['./tab-set.component.less'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TabSetComponent implements AfterViewInit {


  @ViewChild('tabsRef') tabsRef: ElementRef<HTMLDivElement>;

  showArrowLeft: boolean = false;
  showArrowRight: boolean = true;

  constructor() { }

  ngAfterViewInit(): void {
    merge(
      fromEvent(this.tabsRef.nativeElement, 'click'),
      fromEvent(this.tabsRef.nativeElement, 'scroll'),
    )
      .pipe(delay(100), distinct(), distinctUntilChanged())
      .subscribe(() => this.setArrowStatus());
  }

  setArrowStatus() {

    const { scrollLeft, scrollWidth, offsetWidth } = this.tabsRef.nativeElement;
    const offsetLeft = scrollWidth - offsetWidth;

    this.showArrowLeft = scrollLeft > 0;
    this.showArrowRight = scrollLeft < offsetLeft;
  }

  onScrollTo(direction: 'left' | 'right') {

    const width = this.tabsRef.nativeElement.children.item(0).clientWidth;

    if (direction === 'left')
      this.tabsRef.nativeElement.scrollLeft -= width;

    if (direction === 'right')
      this.tabsRef.nativeElement.scrollLeft += width;

  }

}
