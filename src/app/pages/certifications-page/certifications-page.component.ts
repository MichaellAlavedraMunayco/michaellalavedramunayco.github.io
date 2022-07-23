import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-certifications-page',
  templateUrl: './certifications-page.component.html',
  styleUrls: ['./certifications-page.component.less']
})
export class CertificationsPageComponent implements OnInit {

  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
  }

  getBoundingClientRect() {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  moveToFirst() {
    const node = this.elementRef.nativeElement;
    const parentNode = this.elementRef.nativeElement.parentNode;

    parentNode.removeChild(node);
    parentNode.prepend(node);
  }

  moveToLast() {
    const node = this.elementRef.nativeElement;
    const parentNode = this.elementRef.nativeElement.parentNode;

    parentNode.removeChild(node);
    parentNode.append(node);
  }

}
