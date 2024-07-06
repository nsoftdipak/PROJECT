import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LeaveComponent } from './components/leave/leave.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeTimeoffComponent } from './components/employee-timeoff/employee-timeoff.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { RejectReasonModalComponent } from './components/leave/reject-reason-modal/reject-reason-modal.component';
import { DateModalComponent } from './components/calendar/date-modal/date-modal.component';
import { CreateLeaveModalComponent } from './components/leave/reject-reason-modal/create-leave-modal/create-leave-modal.component';
import { UpdateLeaveTypeModalComponent } from './components/leave/update-leave-type-modal/update-leave-type-modal.component';
import { ManageComponent } from './components/manage/manage.component';
import { EditLeaveTypeModalComponent } from './components/manage/edit-leave-type-modal/edit-leave-type-modal.component';
import { HolidayComponent } from './components/holiday/holiday.component';
import { CreateHolidayModalComponent } from './components/holiday/create-holiday-modal/create-holiday-modal.component';
import { EditHolidayModalComponent } from './components/holiday/edit-holiday-modal/edit-holiday-modal.component';
import { CompensatoryRequestComponent } from './components/manage/compensatory-request/compensatory-request.component';
import { CriateCompensatoryRequestModalComponent } from './components/manage/criate-compensatory-request-modal/criate-compensatory-request-modal.component';
import { CancleLeaveComponent } from './components/leave/cancle-leave/cancle-leave.component';
import { RejectLeaveComponent } from './components/leave/reject-leave/reject-leave.component';
import { CreateHolidayComponent } from './components/calendar/create-holiday/create-holiday.component';
import { ReportsComponent } from './components/reports/reports.component';
import { EmployeeLeaveCalendarComponent } from './components/employee-profile/employee-leave-calendar/employee-leave-calendar.component';
import { CreateLeaveRequestSettingComponent } from './components/create-leave-request-setting/create-leave-request-setting.component';
import { FilterLeavePipe } from './components/leave/filter-leave.pipe';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    NavbarComponent,
    SidebarComponent,
    MainContentComponent,
    EmployeeComponent,
    CalendarComponent,
    LeaveComponent,
    EmployeeProfileComponent,
    EmployeeTimeoffComponent,
    AddPersonComponent,
    RejectReasonModalComponent,
    DateModalComponent,
    CreateLeaveModalComponent,
    UpdateLeaveTypeModalComponent,
    ManageComponent,
    EditLeaveTypeModalComponent,
    HolidayComponent,
    CreateHolidayModalComponent,
    EditHolidayModalComponent,
    CompensatoryRequestComponent,
    CriateCompensatoryRequestModalComponent,
    CancleLeaveComponent,
    RejectLeaveComponent,
    CreateHolidayComponent,
    ReportsComponent,
    EmployeeLeaveCalendarComponent,
    CreateLeaveRequestSettingComponent,
    FilterLeavePipe,
  ],
  imports: [CommonModule, AdminDashboardRoutingModule,     FullCalendarModule
    ,FormsModule,ReactiveFormsModule],
    

})
export class AdminDashboardModule {}
