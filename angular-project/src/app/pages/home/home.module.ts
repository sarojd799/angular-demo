import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/services/route-guards/auth.guard';
import { SharedModule } from 'app/shared/shared.module';
import { ContainerComponent } from '../container/container.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
    {
        path: 'home', component: ContainerComponent, children: [
            { path: 'posts', component: HomeComponent }
        ]
    }
]

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    exports: []
})
export class HomeModule { }
