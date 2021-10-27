import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../backend/user.service';
import { SessionService } from '../util/session.service';


@Injectable({ providedIn: 'any' })
export class UserProfileViewGuard implements CanActivate {

    constructor(
        private _userService: UserService,
        private _session: SessionService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        const userId = route.paramMap.get('id')
        if (userId) {
            return this._userService.getUserProfileById(Number(userId)).pipe(
                map((res: any) => {
                    if (res && res.email) {
                        route.data = res;
                        return true;
                    }
                    return false
                }),
                catchError(err => of(false))
            );
        }
        return of(false);

    }

}
