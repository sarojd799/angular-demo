import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../backend/user.service';
import { SessionService } from '../util/session.service';


@Injectable({ providedIn: 'root' })
export class UserDetailsGuard implements CanDeactivate<any> {

    constructor(
        private _userService: UserService,
        private _session: SessionService) { }

    canDeactivate(component: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (!this._session.getUserDetails()) {
            return this._userService.searchUserByUserName(this._session.getUserName()).pipe(
                catchError(err => of(false)),
                map(res => {
                    if (res && res.length) {
                        this._session.saveUserDetails(res[0]);
                        return true;
                    }
                    return false;
                })
            )
        }
        return of(false);

    }

}
