import { ElementRef } from '@angular/core';

export type PagePath = 'overview' | 'projects' | 'certifications';
export type PageEvent = 'previous' | 'next';
export type PageParams = { url?: string, scrollRef?: number, deltaY?: number, key?: string };


export class PageComponent {

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  getBoundingClientRect() {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  moveToFirst() {
    const node = this.elementRef.nativeElement;
    const parentNode = this.elementRef.nativeElement.parentNode;

    parentNode.removeChild(node);
    parentNode.prepend(node);
  }

  moveToLast() {
    const node = this.elementRef.nativeElement;
    const parentNode = this.elementRef.nativeElement.parentNode;

    parentNode.removeChild(node);
    parentNode.append(node);
  }

}

export class PageController {

  page: Page;
  private event: PageEvent = 'previous';
  private stack: Page[] = [];

  lastScrollRef: number = 0;

  constructor() { }

  setPage(page: Page) {
    this.page = page;
  }

  setEvent(event: PageEvent) {
    this.event = event;
  }

  setStack(stack: Page[]) {
    this.stack = stack;
  }

  toPath(url: string): PagePath {
    const path = url.replace('/', '');
    return ['projects', 'certifications'].includes(path)
      ? path as PagePath
      : 'overview';
  }

  getPageFromEvent(event: PageEvent) {
    return {
      ['previous']: this.page.previous,
      ['next']: this.page.next,
    }[event];
  }

  findPage({ url, scrollRef }: PageParams): Page {
    if (url) {
      const path = this.toPath(url);
      return this.stack.find(page => page.path === path);
    }
    if (scrollRef)
      return this.stack.find(page => page.scrollRef === scrollRef);
  }

  getEventBy({ scrollRef, key, deltaY }: PageParams): PageEvent {

    if (scrollRef)
      return scrollRef > this.lastScrollRef ? 'next' : 'previous';

    if (deltaY)
      return deltaY > 0 ? 'next' : 'previous';

    if (key)
      return {
        'ArrowDown': 'next',
        'ArrowUp': 'previous'
      }[key] as PageEvent;
  }

  navigate() {

    if (!this.page) return;

    this.updatePagesOrder();

    this.page.setTitle();
    this.page.scrollIntoView();
  }

  updatePagesOrder() {

    if (!this.event) return;

    if (this.event === 'previous') {

      const lastPage = this.stack.pop();
      this.stack.unshift(lastPage);

      lastPage.component.moveToFirst();
    }

    if (this.event === 'next') {

      const firstPage = this.stack.shift();
      this.stack.push(firstPage);

      firstPage.component.moveToLast();
    }

  }

}

export class Page {

  scrollRef: number;
  path: PagePath;
  title: string;
  component: PageComponent;
  previous: Page;
  next: Page;

  constructor({ path, title, component }: Partial<Page>) {
    this.path = path;
    this.title = title;
    this.component = component;
    this.scrollRef = this.getScrollRef();
  }


  getScrollRef(): number {
    return this.component.getBoundingClientRect().y;
  }

  updateScrollRef() {
    this.scrollRef = this.getScrollRef();
  }

  setSiblingPages(previous: Page, next: Page) {
    this.previous = previous;
    this.next = next;
  }

  scrollIntoView() {
    this.component.scrollIntoView();
  }

  setTitle() {
    document.title = this.title;
  }
}
