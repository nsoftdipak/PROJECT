import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveManagementComponent } from './leave-management.component';
import { AuthGuard } from '../components/auth.guard';

const routes: Routes = [
  { path: '', component: LeaveManagementComponent },
  {
    path: 'admin-dashboard',canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
  },
  {
    path: 'employee-dashboard',canActivate: [AuthGuard],
    loadChildren: () =>
      import('./employee-dashboard/employee-dashboard.module').then(
        (m) => m.EmployeeDashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveManagementRoutingModule {}
