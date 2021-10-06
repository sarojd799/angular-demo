import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {

  loader = new Subject<boolean>();

  showLoader() {
    this.loader.next(true);
  }

  hideLoader() {
    this.loader.next(false);
  }

  registerLoaderOnNavigation() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showLoader();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.hideLoader();
      }
    })
  }

  constructor(private router: Router) {
    this.registerLoaderOnNavigation();
  }
}
