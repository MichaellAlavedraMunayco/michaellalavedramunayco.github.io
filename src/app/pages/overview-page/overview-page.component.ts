import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { Tracker } from '@michaelldev/ngx-profile-avatar/lib';
import { me } from 'src/app/core/data/data';
import { Me } from 'src/app/core/interfaces/portfolio';
import { NavigationComponent, NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.less'],
})
export class OverviewPageComponent extends NavigationComponent implements OnInit {

  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  me: Me = me;
  avatarPercent: number = 0;
  avatarTracker: Tracker = 'cursor';

  showFacebookEmbed: boolean = false;


  constructor(
    elementRef: ElementRef<HTMLElement>,
    public navigator: NavigationService,
  ) {
    super(elementRef);
  }

  ngOnInit(): void { }

  onLoadingAvatar({ loaded, total }: ProgressEvent) {
    this.avatarPercent = loaded / total * 100;
  }

}
