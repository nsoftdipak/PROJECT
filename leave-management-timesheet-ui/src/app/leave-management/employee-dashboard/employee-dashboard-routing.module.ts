import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { Calendar } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalenderComponent } from './components/calender/calender.component';
import { LeaveComponent } from './components/leave/leave.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDashboardComponent,
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'apply-leave',
        component: ApplyLeaveComponent,
      }
      ,
      {
        path:'calender', component:CalenderComponent
      },
      {
        path:'leaves',component:LeaveComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeDashboardRoutingModule { }
