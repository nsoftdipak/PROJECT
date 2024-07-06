import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveManagementRoutingModule } from './leave-management-routing.module';
import { LeaveManagementComponent } from './leave-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LeaveManagementComponent,

  ],
  imports: [
    CommonModule,
    LeaveManagementRoutingModule,
    NgbModule,
  ]
})
export class LeaveManagementModule { }
