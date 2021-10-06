import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContainerComponent } from "./pages/container/container.component";
import { LoginComponent } from "./pages/login/login.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { StudentListComponent } from "./pages/student/student-list/student-list.component";
import { UnauthorizedComponent } from "./pages/unauthorized/unauthorized.component";
import { AuthGuard } from "./services/route-guards/auth.guard";


const appRoutes: Routes = [
    {
        path: '', pathMatch: 'full', canActivateChild: [AuthGuard], children: [
            {
                path: '', component: ContainerComponent, children: [
                    { path: 'student', component: StudentListComponent },
                ]
            }
        ]
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({ imports: [RouterModule.forRoot(appRoutes)] })
export class AppRoutingModule { }