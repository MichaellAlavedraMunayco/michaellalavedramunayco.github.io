import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';

type TabStatus = 'active' | 'default';

@Component({
  selector: 'ui-tab',
  template: `
    <div class="icon--container">
      <svg-icon [name]="icon"></svg-icon>
    </div>
    <p typography size="xs" color="white-5"> {{ name }} </p>`,
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit, OnChanges {

  @Input() icon: string = 'facebook';
  @Input() name: string;
  @Input() status: TabStatus = 'default';

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }
}
