import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


type ButtonType = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium';

@Component({
  selector: 'ui-button',
  template: `
    <button #button [type]="type">
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
        transition: background-color 0.3s;
    }
    button.small {
        width: 48px;
        height: 48px;
    }
    button.medium {
        width: 64px;
        height: 64px;
    }
    button.primary {
        background-color: var(--white-10);
    }
    button.secondary {
        background-color: transparent;
    }
    button:hover {
        background-color: var(--white-30);
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, AfterViewInit {

  @Input() type: ButtonType = 'primary';
  @Input() size: ButtonSize = 'medium';

  @ViewChild('button') button: ElementRef<HTMLButtonElement>;


  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.button.nativeElement.className = `${this.type} ${this.size}`;
  }
}
