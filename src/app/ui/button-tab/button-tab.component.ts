import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

type ButtonTabStatus = 'active' | 'default';

@Component({
  selector: 'ui-button-tab',
  template: `
    <ui-button mode="icon-only" size="small" [status]="status">
    	<svg-icon [name]="icon"></svg-icon>
    </ui-button>

    <p #labelRef typography type="text" size="extralarge" color="white-50">
      {{ name }}
    </p>`,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12px;
      width: 96px;
    }
    ui-button {
      margin: auto;
    }
    p {
      text-align: center;
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonTabComponent implements OnInit {

  @Input() status: ButtonTabStatus = 'default';
  @Input() icon: string = 'facebook';
  @Input() name: string;

  @ViewChild('labelRef') labelRef: ElementRef<HTMLElement>;

  constructor(private hostRef: ElementRef<HTMLElement>) {

    fromEvent(this.hostRef.nativeElement, 'mouseenter')
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.status = 'active';
        this.labelRef.nativeElement.style.color = 'var(--white)';
      });

    fromEvent(this.hostRef.nativeElement, 'mouseleave')
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.status = 'default';
        this.labelRef.nativeElement.style.color = 'var(--white-50)';
      });
  }

  ngOnInit() { }
}
