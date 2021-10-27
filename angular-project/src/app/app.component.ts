import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { delay } from 'rxjs/operators';
import { IdleManagerService } from './services/util/idle-manager';
import { LoaderService } from './services/util/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showSpinner = false;
  spinnerColor: ThemePalette = "accent";
  spinnerSpeed = 50;
  spinnerMode: ProgressSpinnerMode = 'indeterminate';

  constructor(
    private loaderService: LoaderService,
    private _idleManager: IdleManagerService) { }

  subscribeToEvents() {
    this.loaderService.loader.subscribe(val => this.showSpinner = !!val);
  }

  initConfigs() {
    this._idleManager.init();
  }

  ngOnInit() {
    this.subscribeToEvents();
    this.initConfigs();
  }
}
