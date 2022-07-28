import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
// Service
import { NavigationService } from 'src/app/core/services/navigation.service';


@Component({
  selector: 'ui-breadcrumb',
  template: `
    <div class="breadcrumb-item" (click)="navigator.goToPage('overview')">
    	<p typography type="display" size="extrasmall" color="white-50" hoverable="true">Overview</p>
    </div>

    <div (click)="navigator.goToPage('overview')">
    	<p typography type="display" size="extrasmall" color="white-50">/</p>
    </div>

    <div class="breadcrumb-item" (click)="navigator.goToPage(path)">
    	<p typography type="display" size="extrasmall" color="white">
        {{ name }}
      </p>
    </div>`,
  styles: [`
  :host {
    display: flex;
    gap: 8px;
  }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {

  @Input() name: string;
  @Input() path: string;

  constructor(public navigator: NavigationService) { }

  ngOnInit(): void { }

}
