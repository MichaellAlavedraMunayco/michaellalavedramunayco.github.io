import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
// external
import { Tracker } from '@michaelldev/ngx-profile-avatar/lib';
// services
import { NavigationComponent, NavigationService } from 'src/app/core/services/navigation.service';
import { PersonalService } from 'src/app/core/services/personal.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.less'],
})
export class OverviewPageComponent extends NavigationComponent implements OnInit {

  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  avatarPercent: number = 0;
  avatarTracker: Tracker = 'cursor';


  constructor(
    elementRef: ElementRef<HTMLElement>,
    public navigator: NavigationService,
    public data: PersonalService,
  ) {
    super(elementRef);
  }

  ngOnInit(): void { }

  onLoadingAvatar({ loaded, total }: ProgressEvent) {
    this.avatarPercent = loaded / total * 100;
  }

}
