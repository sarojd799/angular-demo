import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentModule } from './pages/student/student.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthGuard } from './services/route-guards/auth.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { ContainerComponent } from './pages/container/container.component';
import { LandingPageModule } from './pages/landing-page/landing-page.module';
import { SessionService } from './services/util/session.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/auth/authentication.service';
import { AJAXInterceptorService } from './services/interceptors/ajaxinterceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StudentModule,
    LandingPageModule,
    RouterModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    SessionService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AJAXInterceptorService, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
