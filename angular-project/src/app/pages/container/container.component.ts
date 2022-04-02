import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SessionService } from 'app/services/util/session.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsManager } from 'app/services/util/user-details.manager';
import { slider } from './animations';
import { WebSocketUtils } from 'app/services/util/web-socket.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, OnDestroy {

  showLeftMenu = false;

  loggedInuser = null;

  userOptDropdownToggled = false;

  nightMode = false;
  connected = false;

  constructor(
    private _session: SessionService,
    public _router: Router,
    public _dialog: MatDialog,
    private _userDeatailsManager: UserDetailsManager,
    private _wsUtils: WebSocketUtils
  ) { }


  /**
   * description: Establish ws connection and assign to window
   */
  connectWSClient() {
    if (this.loggedInuser) {
      this._wsUtils.connect(
        this.onConnected.bind(this),
        this.onConError.bind(this),
      );
    }
  }

  onConnected() {
    //common code or subscribe for app
    this.connected = true;
  }

  onConError(err: any) { //global error handler for socket
    alert("Error occurred while connecting user");
    console.log(err);
  }


  ngOnInit() {
    this.populateData();
    this._userDeatailsManager.userDetails.subscribe(res => res && this.populateData())
    this.connectWSClient()
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

  ngOnDestroy() {
    if (this._wsUtils.connected.value) {
      this._wsUtils.disconnect();
      console.log('ws-client disconnected')
    }
    this.connected = false;
  }

}
