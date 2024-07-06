import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../../../components/services/master.service';

@Component({
  selector: 'app-create-leave-modal',
  templateUrl: './create-leave-modal.component.html',
  styleUrls: ['./create-leave-modal.component.css']
})
export class CreateLeaveModalComponent implements OnInit {

  loggedInUserId: number | null = null;
  createLeaveForm: FormGroup;

  constructor(private fb: FormBuilder, private masterService:MasterService) {
    this.createLeaveForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      is_active: [false],
      is_encashable:[false],
      max_carry_forward:['', Validators.required],
      yearly_leaves:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loggedInUserId = this.masterService.getAdminId();
  }





  onSubmit(): void {
    if (this.createLeaveForm.valid) {
      console.log(this.createLeaveForm.value);

      const formData={
        ...this.createLeaveForm.value,
        created_by:this.loggedInUserId,
        update_by:this.loggedInUserId,
        create_at:new Date(),
        update_at:new Date(),
       
      };
      this.masterService.createLeave(formData).subscribe(
        (responce)=>{
          alert("Leave created successfully")
        }
      )
      // Call your service to save the leave type
    } else {
      console.error('Form is invalid');
    }
  }
}
