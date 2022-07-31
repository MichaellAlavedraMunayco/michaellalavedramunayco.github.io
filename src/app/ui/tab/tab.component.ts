import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'ui-tab',
  template: `
    <div class="icon--container">
      <svg-icon [name]="icon" svgClass="tab-icon"></svg-icon>
    </div>
    <p typography size="xs" color="white" lines="1"> {{ name }} </p>`,
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TabComponent implements OnInit, OnChanges {

  @Input() icon: string = 'facebook';
  @Input() name: string;
  @Input() active: boolean = false;

  constructor(private hostRef: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this.setActive();
  }

  ngOnChanges() {
    this.setActive();
  }

  setActive() {
    this.hostRef.nativeElement.className = this.active ? 'active' : '';
  }
}
