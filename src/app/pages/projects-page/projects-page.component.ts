import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationComponent, NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.less']
})
export class ProjectsPageComponent extends NavigationComponent implements OnInit {

  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  constructor(
    elementRef: ElementRef<HTMLElement>,
    public navigator: NavigationService,
  ) {
    super(elementRef);
  }


  ngOnInit(): void { }

}
