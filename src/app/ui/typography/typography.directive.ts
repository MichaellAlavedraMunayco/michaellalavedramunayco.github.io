import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({
  selector: '[typography]',
})
export class TypographyDirective implements AfterViewInit {

  @Input('size') size: FontSize = 'md';
  @Input('color') color: string = 'white';
  @Input('lines') lines: string = '0';


  constructor(private hostRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit() {
    this.hostRef.nativeElement.className = `typography typo-${this.size} typo-${this.color} typo-lines-${this.lines}`;
  }

}
