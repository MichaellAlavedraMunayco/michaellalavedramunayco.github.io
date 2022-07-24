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
        ['extralarge']: `${72 / this.sizeBase}em`,
        ['large']: `${60 / this.sizeBase}em`,
        ['medium']: `${48 / this.sizeBase}em`,
        ['small']: `${36 / this.sizeBase}em`,
        ['extrasmall']: `${30 / this.sizeBase}em`,
      },
      ['text']: {
        ['extralarge']: `${20 / this.sizeBase}em`,
        ['large']: `${18 / this.sizeBase}em`,
        ['medium']: `${16 / this.sizeBase}em`,
        ['small']: `${14 / this.sizeBase}em`,
        ['extrasmall']: `${12 / this.sizeBase}em`,
      }
    }[this.type][this.size];
  }

  get fontColor() {
    return `var(--${this.color})`;
  }

}
