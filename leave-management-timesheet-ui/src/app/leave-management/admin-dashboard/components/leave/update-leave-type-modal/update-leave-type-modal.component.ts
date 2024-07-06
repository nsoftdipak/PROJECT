import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-leave-type-modal',
  templateUrl: './update-leave-type-modal.component.html',
  styleUrl: './update-leave-type-modal.component.css'
})
export class UpdateLeaveTypeModalComponent  implements OnInit {
  @Input() leave: any;
  updateLeaveForm: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateLeaveForm = this.fb.group({
      leave_type: [this.leave.leave_type.name, Validators.required],
      yearly_leaves: [this.leave.yearly_leaves, Validators.required],
      max_carry_forward: [this.leave.max_carry_forward, Validators.required],
      is_encashable: [this.leave.is_encashable, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.updateLeaveForm.valid) {
      // Add your service call here to update the leave
      console.log(this.updateLeaveForm.value);
      this.activeModal.close(this.updateLeaveForm.value);
    }
  }
}