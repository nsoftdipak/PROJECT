import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../../../../../components/services/master.service';
import { CriateCompensatoryRequestModalComponent } from '../criate-compensatory-request-modal/criate-compensatory-request-modal.component';
import { HttpClient } from '@angular/common/http';
import { LeaveType } from '../../../../employee-dashboard/components/apply-leave/leave.interfaces';

@Component({
  selector: 'app-compensatory-request',
  templateUrl: './compensatory-request.component.html',
  styleUrls: ['./compensatory-request.component.css']
})
export class CompensatoryRequestComponent implements OnInit {
  leaveBalance: any[] = [];
  leaveTypes: LeaveType[] = [];

  constructor(private masterService: MasterService, private modalService: NgbModal, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserLeaveBalance();
    this.fetchLeaveTypes();
  }

  fetchUserLeaveBalance() {
    this.masterService.fetchUserLeaveBalance().subscribe(response => {
      this.leaveBalance = response;
    });
  }

  fetchLeaveTypes(): void {
    this.masterService.getAllLeaveType().subscribe(
      (data: LeaveType[]) => {
        this.leaveTypes = data;
      },
      (error: any) => {
        console.error('Error fetching leave types:', error);
      }
    );
  }

  openCompensatoryLeaveModal() {
    const modalRef = this.modalService.open(CriateCompensatoryRequestModalComponent, { size: 'lg' });
    modalRef.componentInstance.users = this.leaveBalance.map(leave => leave.user);
    modalRef.componentInstance.leaveTypes = this.leaveTypes;
    modalRef.result.then((result) => {
      if (result) {
        console.log('Data received from modal:', result);
        this.submitCompensatoryLeave(result);
      }
    }, (reason) => {
      // Handle dismiss reason if necessary
    });
  }

  submitCompensatoryLeave(data: { user_ids: number[], leave_reason: string, leave_date: string, leave_type: number | null, day_count: number }) {
    data.user_ids.forEach((user_id: number) => {
      this.masterService.updateUserLeaveBalance(user_id, data).subscribe(response => {
        console.log('Compensatory leave submitted successfully', response);
        // Handle success, maybe refresh the leave balance data or show a success message
      }, error => {
        console.error('Error submitting compensatory leave', error);
        // Handle error, maybe show an error message
      });
    });
  }
}
