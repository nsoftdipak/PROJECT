import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../../../../components/services/master.service';
import { EditLeaveTypeModalComponent } from './edit-leave-type-modal/edit-leave-type-modal.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  showLeaves: boolean = false; 
  data: any[] = [];

  constructor(private router: Router, private modalService: NgbModal, private masterService: MasterService) { }

  ngOnInit(): void {
    this.getAllLeaveType();
  }

  isManagePage(): boolean {
    return this.router.url === '/leave-management/admin-dashboard/manage';
  }

  isEmployeeRelatedPage(): boolean {
    return (
      this.router.url === '/leave-management/admin-dashboard/employee' ||
      this.router.url === '/leave-management/admin-dashboard/employee-profile' ||
      this.router.url === '/leave-management/admin-dashboard/employee-timeoff'
    );
  }

  getAllLeaveType(): void {
    this.masterService.getAllComponyLeaveType().subscribe((response) => {
      this.data = response;
      console.log(response);
    }, error => {
      console.error('Error fetching leave types:', error);
    });
  }

  openEditLeaveTypeModal(leaveType: any): void {
    const modalRef = this.modalService.open(EditLeaveTypeModalComponent);
    modalRef.componentInstance.leaveType = leaveType;
    modalRef.result.then((result) => {
      if (result === 'Save click') {
        this.getAllLeaveType(); // Refresh the list after updating
      }
    }, (reason) => {
      console.log(`Dismissed reason: ${reason}`);
    });
  }


  CreateCompensatoryLeave(){
    this.router.navigate(['/leave-management/admin-dashboard/Compensatory-Request'])
    
  }

  goHoliday(){
    this.router.navigate(['/leave-management/admin-dashboard/holiday'])
  }


  goLeaveRequestSetting(){
    this.router.navigate(['/leave-management/admin-dashboard/leave-request-setting'])
  }
}
