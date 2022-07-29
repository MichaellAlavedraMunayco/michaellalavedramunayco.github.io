import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
// services
import { NavigationComponent, NavigationService } from 'src/app/core/services/navigation.service';
import { PersonalService, Project } from 'src/app/core/services/personal.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.less']
})
export class ProjectsPageComponent extends NavigationComponent implements OnInit {

  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  project: Project;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    public navigator: NavigationService,
    public data: PersonalService,
  ) {
    super(elementRef);
  }


  ngOnInit(): void {
    this.project = this.data.person.projects[0];
  }

}
