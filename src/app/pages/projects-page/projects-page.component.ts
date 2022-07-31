import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
// services
import { NavigationComponent, NavigationService } from 'src/app/core/services/navigation.service';
import { PersonalService, Project } from 'src/app/core/services/personal.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.less']
})
export class ProjectsPageComponent extends NavigationComponent implements OnInit, AfterViewInit {

  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  @ViewChild('videoPlayerRef') videoPlayerRef: ElementRef<HTMLVideoElement>;

  projectSelected: Project;
  controlsShowing: boolean = false;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    public navigator: NavigationService,
    public data: PersonalService,
  ) {
    super(elementRef);
  }


  ngOnInit(): void {
    this.projectSelected = this.data.person.projects[0];
  }

  ngAfterViewInit(): void { }

  onSelectProject(project: Project) {
    this.projectSelected = project;
  }

}
