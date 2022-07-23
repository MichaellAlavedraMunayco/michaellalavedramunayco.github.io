import { ElementRef } from '@angular/core';

export class PageComponent {

  constructor(private elementRef: ElementRef<HTMLElement>) { }

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