import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { catchError, map, retryWhen, switchMap, tap } from 'rxjs/operators';
import { LoaderService } from '../util/loader.service';
import { SessionService } from '../util/session.service';
import { AuthenticationService } from '../auth/authentication.service';
import { AUTH_API } from '../auth/auth.api';
import { USER_API } from '../backend/api/user.api';
import { UserDetailsManager } from '../util/user-details.manager';
import { ThrowStmt } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AJAXInterceptorService implements HttpInterceptor {

  count: number = 0;
  constructor(
    private _loader: LoaderService,
    private _session: SessionService,
    private _auth: AuthenticationService,
    private _userManager: UserDetailsManager) { }


  getReqWithAuth(req: HttpRequest<any>) {
    const authorization = this._session.getItem(this._session.authKey) || {};
    return req.clone({ headers: req.headers.set('Authorization', `Bearer ${authorization.token}`) });
  }

  handleError(err: HttpErrorResponse, next: HttpHandler, request: HttpRequest<any>): Observable<any> {
    this._loader.hideLoader();

    if (err.status === 403) {

      if (!request.url.includes("refreshToken")) {
        return this._auth.refreshToken().pipe(
          switchMap((res: any) => {
            this._auth.refreshTokenResponse(res);
            return next.handle(this.getReqWithAuth(request))
          }),
          catchError(errorAfterRefresh => {
            if (errorAfterRefresh.status === 403) this._auth.logOutUser();
            return of(err);
          }));
      } else {
        this._auth.logOutUser();
      }

    }
    return of(err);
  }

  handleResponse(res: HttpEvent<any>) {
    if (res instanceof HttpResponse) {
      if (res.url && res.url.includes(USER_API.updateUserInfoURISnippet)) {
        this._userManager.settUserDetails(res.body, res.headers.get("Authorization"))
      }
    }
    this._loader.hideLoader();
    return res;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._loader.showLoader();
    let url = req.url;
    let reqMod = req.clone();

    reqMod = reqMod.clone({ withCredentials: true })

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

    reqMod = reqMod.clone({ url: env.backendHost + url })

    return next.handle(reqMod).pipe(
      map((event: HttpEvent<any>) => this.handleResponse(event)),
      catchError(err => this.handleError(err, next, reqMod))
    );
  }
}
