import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationComponent, NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-certifications-page',
  templateUrl: './certifications-page.component.html',
  styleUrls: ['./certifications-page.component.less']
})
export class CertificationsPageComponent extends NavigationComponent implements OnInit {

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
