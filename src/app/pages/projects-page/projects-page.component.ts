import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { PageComponent } from 'src/app/core/models/page-component';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.less']
})
export class ProjectsPageComponent extends PageComponent implements OnInit {

  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  ngOnInit(): void { }

}
