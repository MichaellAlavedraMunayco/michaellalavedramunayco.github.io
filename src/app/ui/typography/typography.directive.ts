import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

type FontType = 'display' | 'text';
type FontSize = 'extrasmall' | 'small' | 'medium' | 'large' | 'extralarge';

@Directive({
  selector: '[typography]'
})
export class TypographyDirective implements AfterViewInit {

  @Input('type') type: FontType = 'text';
  @Input('size') size: FontSize = 'small';
  @Input('color') color: string = 'black';
  @Input('hoverable') hoverable: boolean = false;

  private sizeBase: number = 16;

  constructor(private hostRef: ElementRef<HTMLElement>) {

    fromEvent(this.hostRef.nativeElement, 'mouseenter')
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        if (this.hoverable)
          this.hostRef.nativeElement.style.textDecoration = 'underline';
      });

    fromEvent(this.hostRef.nativeElement, 'mouseleave')
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        if (this.hoverable)
          this.hostRef.nativeElement.style.textDecoration = 'unset';
      });
  }

  ngAfterViewInit() {

    this.hostRef.nativeElement.style.fontSize = this.fontSize;
    this.hostRef.nativeElement.style.color = this.fontColor;
    this.hostRef.nativeElement.style.transition = 'color 0.3s';
    this.hostRef.nativeElement.style.cursor = this.hoverable ? 'default' : 'unset';

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
