import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CalendarComponent } from './components/calendar/calendar.component';
// import { LeaveComponent } from './components/leave/leave.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeTimeoffComponent } from './components/employee-timeoff/employee-timeoff.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { LeaveComponent } from './components/leave/leave.component';
import { ManageComponent } from './components/manage/manage.component';
import { HolidayComponent } from './components/holiday/holiday.component';
import { CompensatoryRequestComponent } from './components/manage/compensatory-request/compensatory-request.component';
import { CancleLeaveComponent } from './components/leave/cancle-leave/cancle-leave.component';
import { RejectLeaveComponent } from './components/leave/reject-leave/reject-leave.component';
import { ReportsComponent } from './components/reports/reports.component';
import { EmployeeLeaveCalendarComponent } from './components/employee-profile/employee-leave-calendar/employee-leave-calendar.component';
import { CreateLeaveRequestSettingComponent } from './components/create-leave-request-setting/create-leave-request-setting.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'leave',
        component: LeaveComponent,
      },
      {
        path: '',
        component: MainContentComponent,
      },
      {
        path: 'employee-profile/:id',
        component: EmployeeProfileComponent,
      },
      {
        path: 'employee-timeoff',
        component: EmployeeTimeoffComponent,
      },
      {
        path: 'add-person',
        component: AddPersonComponent,
      },
      {path:'manage', 
        component:ManageComponent
      },

      {
        path:'holiday', component:HolidayComponent
      },
      {
        path:'Compensatory-Request', component:CompensatoryRequestComponent
      },

      {path:'canceled-leave', component:CancleLeaveComponent},

      {path:'rejected-leave', component:RejectLeaveComponent},
      {
        path:'reports', component:ReportsComponent
      },
      {
        path:'leave-calendar', component:EmployeeLeaveCalendarComponent
      },
      {path:'leave-request-setting', component:CreateLeaveRequestSettingComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
