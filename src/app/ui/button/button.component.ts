import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit, ElementRef } from '@angular/core';


type ButtonType = 'button' | 'link';
type ButtonMode = 'icon-only' | 'icon-none';

@Component({
  selector: 'ui-button',
  template: `
  <ng-container *ngIf="mode === 'icon-only'">
    <svg-icon [name]="icon" svgClass="button-icon"></svg-icon>
  </ng-container>
  <ng-container *ngIf="mode === 'icon-none'">
    <p typography size="sm" color="white">{{ label }}</p>
  </ng-container>
  `,
  styleUrls: ['./button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, AfterViewInit {

  @Input() type: ButtonType = 'button';
  @Input() mode: ButtonMode = 'icon-none';
  @Input() icon: string = 'facebook';
  @Input() label: string = 'Label';

  constructor(private hostRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.applyChanges();
  }

  ngAfterViewInit(): void {
    this.applyChanges();
  }

  applyChanges() {
    if (this.hostRef)
      this.hostRef.nativeElement.className = `${this.type} ${this.mode}`;
  }
}
