import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


type ButtonType = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium';
type ButtonMode = 'icon-link' | 'icon-only' | 'icon-none';
type ButtonStatus = 'active' | 'default';

@Component({
  selector: 'ui-button',
  template: `
    <button #button [type]="type" aria-label="icon-button">
    	<ng-content></ng-content>
    </button>`,
  styles: [`
  :host {
    width: fit-content;
  }
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0px;
        color: var(--white);
        fill: var(--white);
        outline: none;
        transition: background-color 0.3s;
    }
    button.icon-link {
      cursor: pointer;
    }
    button.small.icon-link,
    button.small.icon-only {
        border-radius: 50%;
        width: 48px;
        height: 48px;
    }
    button.medium.icon-link,
    button.medium.icon-only {
        border-radius: 50%;
        width: 64px;
        height: 64px;
    }
    button.small.icon-none {
        border-radius: 12px;
        width: fit-content;
        height: 48px;
        padding: 0 20px;
    }
    button.medium.icon-none {
        border-radius: 12px;
        width: fit-content;
        height: 64px;
        padding: 0 24px;
    }
    button.primary {
        background-color: var(--white-10);
    }
    button.secondary {
        background-color: transparent;
    }
    button.active,
    button:focus,
    button:hover {
        background-color: var(--white-30);
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, AfterViewInit {

  @Input() type: ButtonType = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() mode: ButtonMode = 'icon-none';
  @Input() status: ButtonStatus = 'default';

  @ViewChild('button') button: ElementRef<HTMLButtonElement>;


  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.applyChanges();
  }

  ngAfterViewInit(): void {
    this.applyChanges();
  }

  applyChanges() {
    if (this.button)
      this.button.nativeElement.className = `${this.type} ${this.size} ${this.mode} ${this.status}`;
  }
}
