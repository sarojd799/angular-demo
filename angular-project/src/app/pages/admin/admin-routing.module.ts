import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/route-guards/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home.component';
import { AdminManageUsersComponent } from './user-management/admin-manage-users.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivateChild: [AuthGuard],
    component: AdminHomeComponent,
    children: [
      { path: 'adminDashboard', component: AdminDashboardComponent },
      { path: 'manageUsers', component: AdminManageUsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
