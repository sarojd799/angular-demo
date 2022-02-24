import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { NavigationEnd, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/auth/authentication.service';
import { IdleManagerService } from './services/util/idle-manager';
import { LoaderService } from './services/util/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  showSpinner = false;
  spinnerColor: ThemePalette = "accent";
  spinnerSpeed = 50;
  spinnerMode: ProgressSpinnerMode = 'indeterminate';

  timeout: number = 0;
  showTimeoutDialog = false;

  refreshInterval!: Subscription;
  loaderSubscription!: Subscription;

  constructor(
    private loaderService: LoaderService,
    private idleService: IdleManagerService,
    private _auth: AuthenticationService,
    private _router: Router) { }

  subscribeToEvents() {
    this.loaderSubscription = this.loaderService.loader.subscribe(val => this.showSpinner = !!val);

    this._router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd && location.pathname.includes("index")) {
        if (this.refreshInterval) this.refreshInterval.unsubscribe()
        if (this.loaderSubscription) this.loaderSubscription.unsubscribe();
      }
    })
  }


  ngOnInit() {
    this.subscribeToEvents();
    this.registerSessionListener();
    this.registerRefreshTokenInterval();
  }


  registerRefreshTokenInterval() {
    this.refreshInterval = this._auth.timeoutValue.pipe(
      switchMap(val => interval(val || environment.refreshTokenTimeout))
    ).subscribe(val => {
      this._auth.refreshToken().subscribe();
    })
  }

  endUserSession() {
    this._auth.logOutUser();
    this.showTimeoutDialog = false;
    this.idleService.reset();
  }

  extendSession() {
    this.showTimeoutDialog = false;
    this.idleService.reset();
  }

  registerSessionListener() {
    this.idleService.reset();
    this.idleService.init(environment.timeout / 1000)
    this.idleService.idle.onTimeoutWarning.subscribe((countdown) => {
      this.timeout = countdown;
      this.showTimeoutDialog = true;
    })
    this.idleService.idle.onIdleEnd.subscribe(() => {
      this.showTimeoutDialog = false;
      this.timeout = 0;
      this.idleService.reset();
    });
    this.idleService.idle.onTimeout.subscribe(() => {
      this.showTimeoutDialog = false;
      this.timeout = 0;
    })
  }


  ngOnDestroy() {
    if (this.refreshInterval) this.refreshInterval.unsubscribe()
    if (this.loaderSubscription) this.loaderSubscription.unsubscribe();
  }
}
