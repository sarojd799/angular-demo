import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  showLeftMenu = false;
  topMenuItems = [
    { label: "Home", path: '/home' },
    { label: "About", path: "About" },
    { label: "Projects" },
    { label: "Logout" }
  ].map((nav: any) => {
    if (!nav.path) {
      nav.handler = this.handleAction.bind(this)
    }
    return nav;
  });

  constructor(private _auth: AuthenticationService) { }

  handleAction(label: String) {
    if (label === 'Projects') {
      this.showLeftMenu = !!!this.showLeftMenu;
    } else if (label === 'Logout') {
      this._auth.logOutUser();
    }

  }

}
