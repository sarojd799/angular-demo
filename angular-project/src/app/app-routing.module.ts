import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./pages/chat-screen/chat.component";
import { ContainerComponent } from "./pages/container/container.component";
import { HomeComponent } from "./pages/home/home.component";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { UnauthorizedComponent } from "./pages/unauthorized/unauthorized.component";
import { AuthGuard } from "./services/route-guards/auth.guard";
import { LoginResolve } from "./services/route-guards/login.resolve";


/*
  1.At initial load application will check if session persisits. if so then app will navigate to home else login
  2.App component is loaded by default with router-outlet
 */
const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'index' },
    { path: 'index', component: LandingPageComponent, resolve: [LoginResolve] },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: 'admin', loadChildren: "./pages/admin/admin.module#AdminModule" },
    { path: 'home', component: ContainerComponent, canActivateChild: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({ imports: [RouterModule.forRoot(appRoutes)] })
export class AppRoutingModule { }

/**
 {
        path: 'home', canActivateChild: [AuthGuard], component: ContainerComponent,
        children: [
            { path: 'chat', component: ChatComponent },
            { path: '', component: HomeComponent },
        ]
    },
 */