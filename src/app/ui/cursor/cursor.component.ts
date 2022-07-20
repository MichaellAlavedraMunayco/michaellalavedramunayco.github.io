import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged } from 'rxjs/operators';


const FPS = 1000 / 60;

class Point {

  index
  x: number;
  y: number;
  lifetime: number;

  constructor({ x, y, lifetime }: Partial<Point>) {
    this.x = x;
    this.y = y;
    this.lifetime = lifetime || 0;
  }
}

class PointStack {

  points: Array<Point>;

  constructor() {
    this.points = new Array<Point>();
  }

  public add(point: Point) {
    this.points.push(point);
  }

  public get(index: number): Point {
    return this.points[index];
  }

  public previous(index: number): Point {
    return this.get(index - 1) || this.get(index);
  }

  public remove(index: number) {
    this.points.splice(index, 1);
  }

  public size() {
    return this.points.length;
  }
}

class Line {

  private _point: Point;
  private increment: number;
  private decrement: number;
  private rgb: { r: number, g: number, b: number };

  lifetime: number;
  widthStart: number;
  join: CanvasLineJoin;
  width: number;
  strokeStyle: string;

  constructor() {
    this.lifetime = 2 * FPS;
    this.widthStart = 5;
    this.join = 'round';
  }

  get point() {
    return this._point;
  }

  set point(point: Point) {
    this._point = point;
    this.increment = this.getIncrement();
    this.decrement = this.getDecrement();
    this.rgb = this.getRGB();
    this.width = this.getWidth();
    this.strokeStyle = this.getStrokeStyle();
  }

  private getIncrement() {
    return this.point.lifetime / this.lifetime;
  }

  private getDecrement() {
    return 1 - this.increment;
  }

  private getRGB() {
    return {
      // r: Math.floor(255),
      // g: Math.floor(200 - (255 * this.decrement)),
      // b: Math.floor(200 - (255 * this.increment))
      r: Math.floor(30 - (7 * this.increment)),
      g: Math.floor(218 - (95 * this.increment)),
      b: Math.floor(161 - (228 * this.increment))
    };
  }

  private getWidth() {
    // return this.widthStart / this.point.lifetime * 2;
    return this.widthStart * this.decrement;
  }

  getStrokeStyle() {
    const { r, g, b } = this.rgb;
    return `rgb(${r}, ${g}, ${b})`;
  }

}

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursorComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;

  context: CanvasRenderingContext2D;

  drawTimeoutId: number;

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

    const component = this;

    (function draw() {
      component.drawLines();
      component.drawTimeoutId = window.setTimeout(draw, FPS);
    })();
  }

  drawLines = () => {

    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    const line = new Line();

    for (let index = 0; index < this.pointStack.size(); index++) {

      const point = this.pointStack.get(index);
      const lastPoint = this.pointStack.previous(index);

      line.point = point;
      point.lifetime += 1;

      if (point.lifetime > line.lifetime) {
        this.pointStack.remove(index);
        continue;
      }

      this.context.lineJoin = line.join;
      this.context.lineWidth = line.width;
      this.context.strokeStyle = line.strokeStyle;

      this.context.beginPath();
      this.context.moveTo(lastPoint.x, lastPoint.y);
      this.context.lineTo(point.x, point.y);
      this.context.stroke();
      this.context.closePath();

    }

  }

  onWindowResize() {
    if (!this.context) return;
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;
  }

  onMouseMove({ x, y }: MouseEvent) {
    this.pointStack.add(new Point({ x, y }));
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
