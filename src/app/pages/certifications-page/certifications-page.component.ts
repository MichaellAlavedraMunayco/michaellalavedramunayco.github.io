import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { PageComponent } from 'src/app/core/models/page-component';

@Component({
  selector: 'app-certifications-page',
  templateUrl: './certifications-page.component.html',
  styleUrls: ['./certifications-page.component.less']
})
export class CertificationsPageComponent extends PageComponent implements OnInit {

  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  ngOnInit(): void { }

}
