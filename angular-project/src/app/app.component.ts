import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { LoaderService } from './services/util/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showSpinner = false;
  spinnerColor: ThemePalette = "accent";
  spinnerSpeed = 50;
  spinnerMode: ProgressSpinnerMode = 'indeterminate';

  constructor(private loaderService: LoaderService) {
    this.loaderService.loader.subscribe(val => this.showSpinner = !!val);
  }
}
