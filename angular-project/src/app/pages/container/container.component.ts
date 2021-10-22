import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'app/services/util/session.service';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  showLeftMenu = false;

  loggedInuser = null;

  userOptDropdownToggled = false;

  nightMode = false;

  constructor(
    private _session: SessionService,
    public _router: Router,
    private _actRoute: ActivatedRoute,
    public _dialog: MatDialog
  ) { }


  ngOnInit() {
    this.populateData();
  }

  populateData() {
    this.loggedInuser = this._session.getUserName();
  }

  toggleLeftMenu() {
    this.showLeftMenu = !this.showLeftMenu;
  }


  navigate(url: string) {
    this._router.navigateByUrl(url);
  }



  toggleNightMode() {
    this.nightMode = !this.nightMode;
    document.body.classList.toggle('night-mode');
  }

}
