import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { LoaderService } from '../util/loader.service';
import { SessionService } from '../util/session.service';
import { AuthenticationService } from '../auth/authentication.service';
import { AUTH_API } from '../util/api.enum';

@Injectable({ providedIn: 'root' })
export class AJAXInterceptorService implements HttpInterceptor {

  constructor(
    private _loader: LoaderService,
    private _session: SessionService,
    private _auth: AuthenticationService) { }


  handleError(err: HttpErrorResponse): Observable<any> {
    this._loader.hideLoader();
    if (err.status === 401 || err.status === 403) {
      console.log('logout called')
      this._auth.logOutUser();
    }
    return of(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._loader.showLoader();
    let url = req.url;
    let reqMod = req.clone();

    const authRequired = !(AUTH_API.getAllURI().some(u => req.url.includes(u)));
    if (!req.headers.has('Access-Control-Allow-Origin')) {
      reqMod = reqMod.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });
    }
    if (!req.headers.has('Content-Type')) {
      reqMod = reqMod.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    if (!req.headers.has('Authorization') && authRequired) {
      const authorization = this._session.getItem(this._session.authKey) || {};
      reqMod = reqMod.clone({ headers: req.headers.set('Authorization', `Bearer ${authorization.token}`) });
    }

    if (env.baseURI && window.location.host.includes("localhost")) {
      reqMod = reqMod.clone({ url: env.baseURI + url })
    } else {
      reqMod = reqMod.clone({ url: env.baseURI.replace("localhost", "192.168.1.20") + url })
    }

    return next.handle(reqMod).pipe(tap(res => this._loader.hideLoader()), catchError(this.handleError.bind(this)))
  }
}
