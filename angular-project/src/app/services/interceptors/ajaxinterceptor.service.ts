import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment as env, environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { LoaderService } from '../util/loader.service';

@Injectable({ providedIn: 'root' })
export class AJAXInterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loaderService.showLoader()
    console.log('showing loader')
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    if (!request.headers.has('Access-Control-Allow-Origin')) {
      request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
    }

    if (env.baseURI && window.location.host.includes("localhost")) {
      request = request.clone({ url: environment.baseURI + request.url });
    } else {
      request = request.clone({ url: environment.baseURI.replace("localhost", "192.168.1.20") + request.url });
    }


    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        this.loaderService.hideLoader()
        console.log('hiding loader')
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }));
  }
}
