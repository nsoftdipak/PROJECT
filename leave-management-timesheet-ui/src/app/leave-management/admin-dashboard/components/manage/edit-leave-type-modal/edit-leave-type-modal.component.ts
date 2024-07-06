import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../../components/services/master.service';

@Component({
  selector: 'app-edit-leave-type-modal',
  templateUrl: './edit-leave-type-modal.component.html',
  styleUrls: ['./edit-leave-type-modal.component.css']
})
export class EditLeaveTypeModalComponent implements OnInit {
  @Input() leaveType: any;
  editLeaveForm: any;
  loggedInUserId:number|null=null;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.loggedInUserId = this.masterService.getAdminId();

    this.editLeaveForm = this.fb.group({
      yearly_leaves: [this.leaveType.yearly_leaves, Validators.required],
      max_carry_forward: [this.leaveType.max_carry_forward, Validators.required],
      is_encashable: [this.leaveType.is_encashable],
      is_active: [this.leaveType.is_active],
      leave_type_name: [this.leaveType.leave_type.name, Validators.required],
      description: [this.leaveType.leave_type.description, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.editLeaveForm.valid) {
      const updatedLeaveType = {
        ...this.leaveType,
        yearly_leaves: this.editLeaveForm.value.yearly_leaves,
        max_carry_forward: this.editLeaveForm.value.max_carry_forward,
        is_encashable: this.editLeaveForm.value.is_encashable,
        is_active: this.editLeaveForm.value.is_active,
        leave_type: {
          ...this.leaveType.leave_type,
          name: this.editLeaveForm.value.leave_type_name,
          description: this.editLeaveForm.value.description
          
        }
      };

      this.masterService.updateLeaveType(updatedLeaveType.id, updatedLeaveType).subscribe(
        () => {
          this.activeModal.close('Save click');
        },
        error => {
          console.error('Error updating leave type:', error);
        }
      );
    }
  }
}
