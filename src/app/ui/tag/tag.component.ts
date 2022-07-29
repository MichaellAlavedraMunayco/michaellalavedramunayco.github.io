import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ui-tag',
  template: `
    <p typography type="text" size="extralarge" color="white">
      {{ name }}
    </p>`,
  styles: [`
    :host {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--white);
        fill: var(--white);
        border-radius: 4px;
        width: fit-content;
        height: fit-content;
        padding: 4px 12px;
        border: 1px solid var(--white);
        transition: background-color 0.3s;
        cursor: default;
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnInit {

  @Input() name: string;

  constructor() { }

  ngOnInit(): void { }
}
