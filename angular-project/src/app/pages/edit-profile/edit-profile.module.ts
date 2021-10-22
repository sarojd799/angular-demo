import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ContainerComponent } from '../container/container.component';
import { EditProfileComponent } from './edit-profile.component';


const routes: Routes = [
    {
        path: 'home', component: ContainerComponent, children: [
            { path: 'profile', component: EditProfileComponent }
        ]
    }
]

@NgModule({
    declarations: [
        EditProfileComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    exports: []
})
export class EditProfileModule { }
