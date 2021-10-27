import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SessionService } from 'app/services/util/session.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsManager } from 'app/services/util/user-details.manager';
import { slider } from './animations';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {

  showLeftMenu = false;

  loggedInuser = null;

  userOptDropdownToggled = false;

  nightMode = false;

  constructor(
    private _session: SessionService,
    public _router: Router,
    public _dialog: MatDialog,
    private _userDeatailsManager: UserDetailsManager
  ) { }


  ngOnInit() {
    this.populateData();
    this._userDeatailsManager.userDetails.subscribe(res => {
      if (res) this.populateData();
    })
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


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

}
