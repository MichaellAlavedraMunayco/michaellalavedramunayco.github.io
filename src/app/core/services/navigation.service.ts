import { Injectable, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinct, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private currentPage: Page;
  private pageStack: PageStack;
  private pathValidator: PathValidator = new PathValidator();
  private subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = this.subscribe();
  }

  subscribe() {

    return this.router.events
      .pipe(
        distinct(),
        filter<NavigationEnd>(event => event instanceof NavigationEnd),
      )
      .subscribe(({ url }) => this.applyPage(url));
  }

  unsubscribe() {
    this.subscription?.unsubscribe();
  }

  setStack(pageStack: PageStack) {
    this.pageStack = pageStack;
    this.pathValidator.setDefaultPath(pageStack.defaultPage.path);
    this.pathValidator.setAllowedPaths(pageStack.allowedPaths);
  }

  setCurrentPage(currentPage: Page) {
    this.currentPage = currentPage;
  }

  searchPageBy({ pathName }: PageQueryParams) {

    if (pathName) {
      const path = this.pathValidator.toValidPath(pathName);
      return this.pageStack.getPageByPath(path);
    }
  }

  applyPage(url: string) {

    if (!this.currentPage) {
      this.currentPage = this.searchPageBy({ pathName: url });
    }

    this.currentPage.setTitle();
    this.currentPage.scrollIntoView();
  }

  goToPage(pathName: string) {

    const page = this.searchPageBy({ pathName });

    if (!page) throw new Error('Invalid path');

    this.setCurrentPage(page);
    this.router.navigate([page.path]);
  }

  goToPreviousPage() {
    this.setCurrentPage(this.currentPage.previous);
    this.router.navigate([this.currentPage.path]);
  }

  goToNextPage() {
    this.setCurrentPage(this.currentPage.next);
    this.router.navigate([this.currentPage.path]);
  }
}

export const enum NavigationEvent {
  OnPrevious = 'onprevious',
  OnNext = 'onnext',
};

export interface PageQueryParams {
  navigationEvent?: NavigationEvent,
  pathName?: string
};


export class NavigationComponent {

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}

export class PageStack {

  defaultPage: Page;
  allowedPaths: string[] = [];

  private stack: Array<Page>;

  constructor() {
    this.stack = new Array<Page>();
    return this;
  }

  start(page: Page) {
    this.defaultPage = page;
    this.allowedPaths.push(page.path);
    this.stack.push(page);
    return this;
  }

  add(page: Page) {
    this.allowedPaths.push(page.path);
    this.stack.push(page);
    return this;
  }

  end(page: Page) {
    this.allowedPaths.push(page.path);
    this.stack.push(page);
    return this;
  }

  getPageByPath(path: string) {
    return this.stack.find(page => page.path === path);
  }

}

export class Page {

  path: string;
  title: string;
  component: NavigationComponent;

  previous: Page;
  next: Page;

  constructor({ path, title, component }: Partial<Page>) {
    this.path = path;
    this.title = title;
    this.component = component;
  }

  siblings({ previous, next }: Partial<Page>) {
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


export class PathValidator {

  defaultPath: string;
  allowedPaths: string[] = [];

  constructor() { }

  setDefaultPath(defaultPath: string) {
    this.defaultPath = defaultPath;
  }

  setAllowedPaths(allowedPaths: string[]) {
    this.allowedPaths = allowedPaths;
  }

  clearPath(pathName: string) {
    return pathName.replace('/', '');
  }

  isValidPath(path: string) {
    return this.allowedPaths.includes(path)
  }

  toValidPath(pathName: string) {

    const pathCleaned = this.clearPath(pathName);

    return this.isValidPath(pathCleaned) ? pathCleaned : this.defaultPath;
  }

}
