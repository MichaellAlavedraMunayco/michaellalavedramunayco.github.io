import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged } from 'rxjs/operators';


class Point {

  x: number;
  y: number;
  root: boolean;
  factor: number;
  minRadius: number = 5;

  constructor({ x, y, root }: Partial<Point>) {
    this.x = x;
    this.y = y;
    this.root = root;
  }

  get radius() {
    return this.factor * this.minRadius;
  }

  get alpha() {
    return this.factor / 2;
  }

  get color() {
    return `rgba(30, 218, 161, ${this.alpha})`;
    // return `rgba(255, 255, 255, ${this.alpha})`;
  }

  public draw(context: CanvasRenderingContext2D) {

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.fillStyle = this.color;
    context.fill();
  }

}

class Line {

  constructor(public root: Point, public previous: Point) {
    return this;
  }

  public draw(context: CanvasRenderingContext2D) {

    if (!this.root || !this.previous) return;

    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = this.root.radius * 2;
    context.strokeStyle = this.root.color;
    context.beginPath();
    context.moveTo(this.previous.x, this.previous.y);
    context.lineTo(this.root.x, this.root.y);
    context.stroke();
    context.closePath();
  }
}

class PointStack {

  points: Array<Point>;
  maxSize: number;

  constructor() {
    this.points = new Array<Point>();
    this.maxSize = 40;
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
    }
    canvas {
        width: 100vw;
        height: 100vh;
        z-index: 9;
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursorComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;

  context: CanvasRenderingContext2D;

  drawTimeoutId: number;

  pointRoot: Point = new Point({ x: 0, y: -5, root: true });
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

      const point = this.pointStack.get(index);
      point.root = false;
      point.factor = index / size;
      const previousPoint = this.pointStack.previous(index);
      point.factor = (index - 1) / size;

      new Line(point, previousPoint).draw(this.context);
    }

    this.pointRoot.draw(this.context);
    this.pointStack.add(this.pointRoot);
  };

  onWindowResize() {
    if (!this.context) return;
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;
  }

  onMouseMove({ x, y }: MouseEvent) {
    this.pointRoot = new Point({ x, y, root: true });
  }


  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
    this.cursorSubscription.unsubscribe();
    window.clearTimeout(this.drawTimeoutId);
  }

}

// function enableListeners() {

// myCanvas.addEventListener('mousemove', function (e) {
//   if (frame === drawEveryFrame) {
//     addPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
//     frame = 0;
//   }
//   frame++;
// });

// myCanvas.addEventListener('mouseover', function (e) { });
// myCanvas.addEventListener('mouseleave', function (e) { });

// myCanvas.addEventListener('touchstart', function (e) {
//   console.log(e.touches);
// });
// myCanvas.addEventListener('touchmove', function (e) { });
// myCanvas.addEventListener('touchend', function (e) { });

// }