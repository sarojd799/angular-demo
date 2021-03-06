import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AUTH_API } from './auth.api';
import { SessionService } from '../util/session.service';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  tokenExpired = false;

  timeoutValue: Subject<number> = new Subject();

  constructor(
    private _httpc: HttpClient,
    private _router: Router,
    private _session: SessionService,
    private _socialAuth: SocialAuthService) {
    this.registerLoaderOnNavigation()
  }

  initSession(timeout: number) {
    this.timeoutValue.next(timeout);
  }

  registerLoaderOnNavigation() {
    this._router.events.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(event => {
      if (!this._session.getUserName()) this.logOutUser();
    })
  }

  validateRegisterationName(name: string) {
    return this._httpc.get(AUTH_API.checkUserByEmailURI(name));
  }

  saveUserCredentials(credentials: string) {
    this._session.addItem(this._session.authKey, credentials);
  }

  clearUserCredentials() {
    this._session.clearCredentials();
  }

  logOutUser() {
    const user = this._session.getUserDetails();
    if (user) {
      this.logoutUser(user.userDetailsId).subscribe()
    }
    this.clearUserCredentials()
    this._router.navigate(['index'])
  }


  loginUser(payload: any): Observable<any> {
    return this._httpc.post(AUTH_API.loginUserURI, payload).pipe(
      tap((res: any) => {
        if (res.timeout && res.timeout > 0) {
          this.initSession(res.timeout);
        }
      })
    )
  }

  registerNewUser(newAuth: any) {
    return this._httpc.post(AUTH_API.registerNewUserURI, newAuth);
  }

  logoutUser(userId: number) {
    return this._httpc.post(AUTH_API.logoutUserURI(userId), {})
  }


  refreshTokenResponse(res: any) {
    this.tokenExpired = false;
    this._session.updateSessionToken(res.accessToken);
  }

  refreshToken() {
    return this._httpc.get(AUTH_API.refreshTokenURI());
  }


}

