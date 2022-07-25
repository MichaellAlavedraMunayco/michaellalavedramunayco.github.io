import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'ui-progress-bar',
  template: `
    <div class="progress" [style]="'width:' + _percent + '%'"></div>`,
  styles: [`
    :host {
        position: relative;
        height: 4px;
        width: 100%;
        min-height: 4px;
        min-width: 30px;
        background-color: var(--white-50);
        opacity: 1;
        transition: opacity 0.3s;
    }
    :host.show {
        opacity: 1;
    }
    :host.hide {
        opacity: 0;
    }
    div.progress {
        position: absolute;
        inset: 0;
        right: unset;
        width: 0%;
        background-color: var(--white);
        transition: width .05s;
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit, OnChanges {

  @Input() set percent(percent: number) {

    percent = percent || 0;
    percent = percent < 0 ? 0 : percent;
    percent = percent > 100 ? 100 : percent;
    this._percent = percent;

    if (this.hideOnCompletion && this._percent === 100)
      this.elementRef.nativeElement.className = 'hide';
    else
      this.elementRef.nativeElement.className = 'show';
  }

  @Input() hideOnCompletion: boolean = true;

  _percent: number = 100;


  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void { }

  ngOnChanges(): void { }

}
