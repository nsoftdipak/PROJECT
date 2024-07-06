import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../../../../components/services/master.service';
import { LeaveServiceService } from './leave-service.service';
import { RejectReasonModalComponent } from './reject-reason-modal/reject-reason-modal.component';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  leaves: any[] = [];
  filteredLeaves: any[] = []; // New array to store filtered leaves
  showLeaves: boolean = false;
  selectedLeaveStatus: string = 'Pending';
  searchText: string = ''; // Text input for filtering

  constructor(
    private masterService: MasterService,
    private modalService: NgbModal,
    private leaveService: LeaveServiceService
  ) { }

  ngOnInit(): void {
    this.fetchLeaves('pending');
  }

  setLeaveStatus(label: string, status: string): void {
    this.selectedLeaveStatus = label;
    this.fetchLeaves(status);
  }

  fetchLeaves(status: string): void {
    this.masterService.getLeavesByStatusAndManagerId(status).subscribe(
      (data: any[]) => {
        this.leaves = data.map(leave => ({ ...leave, selected: false }));
        this.filteredLeaves = [...this.leaves]; // Initialize filteredLeaves with all leaves
        this.applyFilters(); // Apply initial filters
      },
      error => {
        console.error('Error fetching leaves:', error);
      }
    );
  }

  toggleShowLeaves(): void {
    this.showLeaves = !this.showLeaves;
  }

  openRejectReasonModal(leaveId: number): void {
    const modalRef = this.modalService.open(RejectReasonModalComponent, { centered: true });
    modalRef.componentInstance.leaveId = leaveId;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.updateLeaveStatus(leaveId, 'rejected', result);
        }
      },
      (reason) => {
        console.log(`Dismissed reason: ${reason}`);
      }
    );
  }

  updateLeaveStatus(leaveId: number, status: string, rejectionReason?: string): void {
    if (status === 'rejected' && !rejectionReason) {
      console.error('Rejection reason is required for rejection.');
      return;
    }

    this.masterService.updateLeaveStatus(leaveId, status, rejectionReason).subscribe(
      () => {
        this.fetchLeaves(this.selectedLeaveStatus); // Refresh leaves after update
      },
      error => {
        console.error('Error occurred while updating leave status:', error);
      }
    );
  }

  approveLeave(leaveId: number): void {
    this.updateLeaveStatus(leaveId, 'approved');
  }

  rejectLeave(leaveId: number): void {
    this.openRejectReasonModal(leaveId);
  }

  approveSelected(): void {
    const selectedLeaves = this.getSelectedLeaves();
    if (selectedLeaves.length === 0) {
      console.warn('No leaves selected for approval.');
      return;
    }

    selectedLeaves.forEach(leave => {
      this.updateLeaveStatus(leave.id, 'approved');
    });
  }

  rejectSelected(): void {
    const selectedLeaves = this.getSelectedLeaves();
    if (selectedLeaves.length === 0) {
      console.warn('No leaves selected for rejection.');
      return;
    }

    selectedLeaves.forEach(leave => {
      this.openRejectReasonModal(leave.id);
    });
  }

  getSelectedLeaves(): any[] {
    return this.filteredLeaves.filter(leave => leave.selected);
  }

  hasSelectedLeaves(): boolean {
    return this.getSelectedLeaves().length > 0;
  }

  applyFilters(): void {
    let filteredLeaves = [...this.leaves];

    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase().trim();
      filteredLeaves = filteredLeaves.filter(leave =>
        leave.user.name.toLowerCase().includes(searchTextLower) ||
        leave.leave_type.toLowerCase().includes(searchTextLower) ||
        leave.from_date.includes(searchTextLower) ||
        leave.to_date.includes(searchTextLower)
      );
    }

    this.filteredLeaves = filteredLeaves;
  }


  isPendingStatus(): boolean {
    return this.selectedLeaveStatus === 'Pending';
  }
  
  clearFilters(): void {
    this.searchText = '';
    this.applyFilters();
  }
}
