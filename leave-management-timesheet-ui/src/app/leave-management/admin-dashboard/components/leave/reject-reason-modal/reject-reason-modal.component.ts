import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reject-reason-modal',
  templateUrl: './reject-reason-modal.component.html',
  styleUrls: ['./reject-reason-modal.component.css']
})
export class RejectReasonModalComponent {
  @Input() leaveId: number | null = null;
  rejectionReason: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  closeModal(): void {
    this.activeModal.dismiss('Close button clicked');
  }

  confirmRejection(): void {
    if (!this.rejectionReason) {
      alert('Please enter a rejection reason.');
      return;
    }
    this.activeModal.close(this.rejectionReason);
  }
}
