import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthGuard } from './services/route-guards/auth.guard';
import { UserDetailsGuard } from './services/route-guards/user-details.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { LandingPageModule } from './pages/landing-page/landing-page.module';
import { SessionService } from './services/util/session.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/auth/authentication.service';
import { AJAXInterceptorService } from './services/interceptors/ajaxinterceptor.service';
import { AdminModule } from './pages/admin/admin.module';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { IdleManagerService } from './services/util/idle-manager';
import { ChatModule } from './pages/chat-screen/chat.module';
import { ContainerModule } from './pages/container/container.module';
import { HomeModule } from './pages/home/home.module';
import { SearchResultModule } from './pages/search-result/search-result.module';
import { UserProfileModule } from './pages/user-profile/user-profile.module';
import { WebSocketUtils } from './services/util/web-socket.service';
import HTMLUtils from './services/util/htmlUtils';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatProgressSpinnerModule,
    HttpClientModule,

    //Feature-modules-start
    LandingPageModule,
    ChatModule,
    AdminModule,
    HomeModule,
    SearchResultModule,
    UserProfileModule,
    ContainerModule,
    //-Feature-modules-end

    AppRoutingModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
    AuthGuard,
    UserDetailsGuard,
    SessionService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AJAXInterceptorService, multi: true },
    IdleManagerService,
    WebSocketUtils,
    HTMLUtils

  ],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule { }
