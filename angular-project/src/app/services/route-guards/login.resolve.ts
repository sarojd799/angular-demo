import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';


@Injectable({ providedIn: 'root' })
export class LoginResolve implements Resolve<any> {

    constructor(private _auth: AuthenticationService, private _router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        return this._auth.clearUserCredentials();
    }


}
