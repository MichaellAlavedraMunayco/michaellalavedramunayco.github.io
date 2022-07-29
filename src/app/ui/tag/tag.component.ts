import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-tag',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        color: var(--white);
        fill: var(--white);
        border-radius: 8px;
        width: fit-content;
        height: fit-content;
        padding: 8px 20px 8px 12px;
        background-color: var(--white-10);
        transition: background-color 0.3s;
    }
    :host:focus,
    :host:hover {
        background-color: var(--white-30);
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
