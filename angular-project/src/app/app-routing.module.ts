import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ContainerComponent } from "./pages/container/container.component";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { LoginComponent } from "./pages/landing-page/login/login.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { StudentListComponent } from "./pages/student/student-list/student-list.component";
import { UnauthorizedComponent } from "./pages/unauthorized/unauthorized.component";
import { AuthGuard } from "./services/route-guards/auth.guard";
import { LoginResolve } from "./services/route-guards/login.resolve";


/*
  1.At initial load application will check if session persisits. if so then app will navigate to home else login
  2.App component is loaded by default with router-outlet
 */
const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'base', resolve: [LoginResolve] },
    {
        path: 'home', canActivateChild: [AuthGuard], component: ContainerComponent,
        children: [
            { path: 'student', component: StudentListComponent }
        ]
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: 'base', component: LandingPageComponent, resolve: [LoginResolve] },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({ imports: [RouterModule.forRoot(appRoutes)] })
export class AppRoutingModule { }