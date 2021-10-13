import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';


@Injectable({ providedIn: 'root' })
export class LoginResolve implements Resolve<any> {

    constructor(private _auth: AuthenticationService, private _router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if (route.routeConfig && route.routeConfig.path === '') {
            this._router.navigate(['/login'])
        } else {
            return this._auth.clearUserCredentials();
        }

    }


}
