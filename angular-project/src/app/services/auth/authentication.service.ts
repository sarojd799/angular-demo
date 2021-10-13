import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SessionService } from '../util/session.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(
    private _httpc: HttpClient,
    private router: Router,
    private _session: SessionService,
    private _socialAuth: SocialAuthService) { }

  validateRegisterationName(name: string) {
    return this._httpc.get(`/existsUserWithName?username=${name}`);
  }


  saveUserCredentials(token: string) {
    this._session.addItem(this._session.authKey, token);
  }

  clearUserCredentials() {
    this._session.clearCredentials();
  }

  loginUser(payload: any): Observable<any> {
    return this._httpc.post('/login', payload);
  }

  logOutUser() {
    this.clearUserCredentials()
    this.router.navigate([''])
    this._socialAuth.signOut();
  }


}
