import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


type ButtonType = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium';

@Component({
  selector: 'ui-button',
  template: `
    <button #button [type]="type" (click)="onClick($event)">
    	<ng-content></ng-content>
    </button>`,
  styles: [`
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 0px;
        color: var(--white);
        fill: var(--white);
        outline: none;
        background: transparent;
        transition: background-color 0.3s;
    }
    button:hover {
        background-color: var(--white-30);
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, AfterViewInit {

  @Input() type: ButtonType = 'primary';
  @Input() size: ButtonSize = 'medium';

  @Output() click = new EventEmitter<Event>();

  @ViewChild('button') button: ElementRef<HTMLButtonElement>;


  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.button.nativeElement.style.width = this.dimension;
    this.button.nativeElement.style.height = this.dimension;
    this.button.nativeElement.style.backgroundColor = this.background;
  }

  get dimension() {
    return {
      ['small']: '48px',
      ['medium']: '64px',
    }[this.size];
  }

  get background() {
    return {
      ['primary']: 'var(--white-10) !important',
      ['secondary']: 'transparent !important',
    }[this.type];
  }

  onClick(event: Event) {
    this.click.emit(event);
  }
}
