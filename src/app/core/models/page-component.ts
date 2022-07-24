import { ElementRef } from '@angular/core';

export type PagePath = 'overview' | 'projects' | 'certifications';
export type PageEvent = 'previous' | 'next';
export type PageParams = { pageEvent?: PageEvent, url?: string };


export class PageComponent {

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}

export class PageController {

  page: Page;
  event: PageEvent;

  private stack: Page[] = [];

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

  getPage({ pageEvent, url }: PageParams) {

    if (url) {
      const path = new PageURL(url).toPath();
      return this.stack.find(page => page.path === path);
    }

    if (pageEvent) {
      return { 'previous': this.page.previous, 'next': this.page.next }[pageEvent];
    }
  }

  navigate() {

    if (!this.page) return;

    this.page.setTitle();
    this.page.scrollIntoView();
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
  }

  siblings({ previous, next }: { previous: Page, next: Page }) {
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

export class PageURL {

  defaultPath: PagePath = 'overview';
  allowedPaths: PagePath[] = ['projects', 'certifications'];

  constructor(public url: string) { }

  toPath(): PagePath {
    const path = this.url.replace('/', '') as PagePath;
    return this.allowedPaths.includes(path) ? path : this.defaultPath;
  }

}