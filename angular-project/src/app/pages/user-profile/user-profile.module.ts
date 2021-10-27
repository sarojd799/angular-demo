import { NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileViewGuard } from 'app/services/route-guards/view-profile.guard';
import { SharedModule } from 'app/shared/shared.module';
import { CommonComponentsModule } from '../components/components.module';
import { UserIconComponent } from '../components/user-icon/user-icon.component';
import { ContainerComponent } from '../container/container.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserProfileComponent } from './user-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';


const routes: Routes = [
    {
        path: 'home', component: ContainerComponent, children: [
            {
                path: 'profile', component: UserProfileComponent, children: [
                    { path: '', component: EditProfileComponent },
                    { path: ':id', component: ViewProfileComponent, canActivate: [UserProfileViewGuard], data: {} }
                ]
            }
        ]
    }
]

@NgModule({
    declarations: [
        EditProfileComponent,
        ViewProfileComponent,
        UserProfileComponent
    ],
    imports: [
        SharedModule,
        CommonComponentsModule,
        RouterModule.forChild(routes),
    ],
    providers: [UserProfileViewGuard],
    exports: []
})
export class UserProfileModule { }
