import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../util/session.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private _httpc: HttpClient, private router: Router, private _session: SessionService) { }

  clearUserCredentials() {
    this._session.clearCredentials();
  }

  loginUser(payload: any): Observable<any> {
    return this._httpc.post('/login', payload);
  }

  logOutUser() {
    this.clearUserCredentials()
    this.router.navigate([''])
  }


}
