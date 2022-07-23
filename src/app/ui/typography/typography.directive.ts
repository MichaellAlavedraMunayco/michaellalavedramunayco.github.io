import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

type FontType = 'display' | 'text';
type FontSize = 'extrasmall' | 'small' | 'medium' | 'large' | 'extralarge';

@Directive({
  selector: '[typography]'
})
export class TypographyDirective implements AfterViewInit {

  @Input('type') type: FontType = 'text';
  @Input('size') size: FontSize = 'small';
  @Input('color') color: string = 'black';

  private sizeBase: number = 16;

  constructor(private reference: ElementRef<HTMLElement>) { }

  ngAfterViewInit() {
    this.reference.nativeElement.style.fontSize = this.fontSize;
    this.reference.nativeElement.style.color = this.fontColor;
  }

  get fontSize() {
    return {
      ['display']: {
        ['extralarge']: `${128 / this.sizeBase}rem`,
        ['large']: `${80 / this.sizeBase}rem`,
        ['medium']: `${48 / this.sizeBase}rem`,
        ['small']: `${36 / this.sizeBase}rem`,
        ['extrasmall']: `${30 / this.sizeBase}rem`,
      },
      ['text']: {
        ['extralarge']: `${20 / this.sizeBase}rem`,
        ['large']: `${18 / this.sizeBase}rem`,
        ['medium']: `${16 / this.sizeBase}rem`,
        ['small']: `${14 / this.sizeBase}rem`,
        ['extrasmall']: `${12 / this.sizeBase}rem`,
      }
    }[this.type][this.size];
  }

  get fontColor() {
    return `var(--${this.color})`;
  }

}
