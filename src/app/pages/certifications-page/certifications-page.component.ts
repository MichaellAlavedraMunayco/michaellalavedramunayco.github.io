import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-certifications-page',
  templateUrl: './certifications-page.component.html',
  styleUrls: ['./certifications-page.component.css']
})
export class CertificationsPageComponent implements OnInit {

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
  }

  getBoundingClientRect() {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}
