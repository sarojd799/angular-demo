import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AUTH_API } from './auth.api';
import { SessionService } from '../util/session.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(
    private _httpc: HttpClient,
    private _router: Router,
    private _session: SessionService,
    private _socialAuth: SocialAuthService) {
    this.registerLoaderOnNavigation()
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
    this.clearUserCredentials()
    this._router.navigate(['index'])
    //this._socialAuth.signOut();
  }


  loginUser(payload: any): Observable<any> {
    return this._httpc.post(AUTH_API.loginUserURI, payload);
  }

  registerNewUser(newAuth: any) {
    return this._httpc.post(AUTH_API.registerNewUserURI, newAuth);
  }


}
function checkUserByEmailURI(name: string): string {
  throw new Error('Function not implemented.');
}

