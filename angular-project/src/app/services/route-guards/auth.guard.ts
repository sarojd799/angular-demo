import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../util/session.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private router: Router, private _session: SessionService) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this._session.getItem(this._session.authKey)) {
      this.router.navigate(['login'])
    }
    return true;
  }

}
