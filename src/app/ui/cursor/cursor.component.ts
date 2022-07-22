import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged } from 'rxjs/operators';


class Vector {

  constructor(
    public x: number,
    public y: number,
  ) { }

  public set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Point {

  position: Vector;
  factor: number;

  constructor({ position }: Partial<Point>) {
    this.position = position;
  }

  get radius() {
    return this.factor * 10;
  }

  get alpha() {
    return this.factor / 2;
  }

  get color() {
    return `rgba(30, 218, 161, ${this.alpha})`;
  }

  setFactor(factor: number) {
    this.factor = factor;
    return this;
  }

  public draw(context: CanvasRenderingContext2D) {

    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
    context.fillStyle = this.color;
    context.fill();
  }

}

class Line {

  from: Point;
  to: Point;

  constructor({ from, to }: Partial<Line>) {
    this.from = from;
    this.to = to;
  }

  public draw(context: CanvasRenderingContext2D) {

    if (!this.from || !this.to) return;

    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = this.to.radius;
    context.strokeStyle = this.to.color;
    context.beginPath();
    context.moveTo(this.from.position.x, this.from.position.y);
    context.lineTo(this.to.position.x, this.to.position.y);
    context.stroke();
    context.closePath();
  }
}

class PointStack {

  points: Array<Point>;
  maxSize: number;

  constructor() {
    this.points = new Array<Point>();
    this.maxSize = 23;
  }

  public add(point: Point) {
    this.points.push(point);
    if (this.points.length > this.maxSize)
      this.points.shift();
  }

  public get(index: number): Point {
    return this.points[index];
  }

  public previous(index: number): Point {
    return this.points[index - 1] || this.get(index);
  }

  public size() {
    return this.points.length;
  }
}


@Component({
  selector: 'app-cursor',
  template: `
    <canvas #canvas></canvas>`,
  styles: [`
    :host,
    canvas {
        position: fixed;
        pointer-events: none;
    }
    canvas {
        width: 100vw;
        height: 100vh;
        z-index: 3;
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursorComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;

  context: CanvasRenderingContext2D;

  drawTimeoutId: number;

  point: Point = new Point({ position: new Vector(0, -5) });

  pointStack: PointStack = new PointStack();

  resizeSubscription: Subscription;
  cursorSubscription: Subscription;


  constructor() {

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe(() => this.onWindowResize());

    this.cursorSubscription = fromEvent<MouseEvent>(window, 'mousemove')
      .pipe(distinct())
      .subscribe(event => this.onMouseMove(event));
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

    this.context = this.canvasRef.nativeElement.getContext('2d');
    this.onWindowResize();

    const self = this;

    (function render() {
      self.start();
      self.drawTimeoutId = window.setTimeout(render, 1000 / 60);
    })();
  }

  start() {

    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    for (let index = 0, size = this.pointStack.size(); index < size; index++) {

      const point = this.pointStack.get(index).setFactor(index / size);
      const previous = this.pointStack.previous(index);

      const line = new Line({ from: previous, to: point });
      line.draw(this.context);

    }

    this.point.draw(this.context);
    this.pointStack.add(this.point);
  };

  onWindowResize() {
    if (!this.context) return;
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;
  }

  onMouseMove({ x, y }: MouseEvent) {
    this.point = new Point({ position: new Vector(x, y) });
  }


  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
    this.cursorSubscription.unsubscribe();
    window.clearTimeout(this.drawTimeoutId);
  }

}