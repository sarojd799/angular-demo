import { NgModule } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.services';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonComponentsModule } from '../components/components.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminManageUsersComponent } from './user-management/admin-manage-users.component';


@NgModule({
    declarations: [
        AdminHomeComponent,
        AdminDashboardComponent,
        AdminManageUsersComponent
    ],
    imports: [
        SharedModule,
        CommonComponentsModule,
        AdminRoutingModule,
    ],
    providers: [AdminService],
    exports: []
})
export class AdminModule { }
