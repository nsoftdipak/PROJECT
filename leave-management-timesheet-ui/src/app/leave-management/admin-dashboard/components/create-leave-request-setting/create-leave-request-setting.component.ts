// create-leave-request-setting.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveRequestService } from './leave-request.service';

@Component({
  selector: 'app-create-leave-request-setting',
  templateUrl: './create-leave-request-setting.component.html',
  styleUrls: ['./create-leave-request-setting.component.css']
})
export class CreateLeaveRequestSettingComponent implements OnInit {
  leaveRequestForm: any;
  leaveTypes: any[] = [];
  companies: any[] = [];

  constructor(private fb: FormBuilder, private leaveRequestService: LeaveRequestService) {}

  ngOnInit(): void {
    this.leaveRequestForm = this.fb.group({
      value: ['', [Validators.required, Validators.min(1)]],
      unit: ['day', Validators.required],
      leaveTypeId: ['', Validators.required],
      companyId: ['', Validators.required]
    });

    this.loadLeaveTypes();
    this.loadCompanies();
  }

  loadLeaveTypes(): void {
    this.leaveRequestService.getAllLeaveType().subscribe((types) => {
      this.leaveTypes = types;
    });
  }

  loadCompanies(): void {
    this.leaveRequestService.getAllCompany().subscribe((companies) => {
      this.companies = companies;
    });
  }

  onSubmit(): void {
    if (this.leaveRequestForm.valid) {
      const newLeaveRequest = {
        ...this.leaveRequestForm.value,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.leaveRequestService.createLeaveRequestSetting(newLeaveRequest).subscribe(response => {
        this.leaveRequestForm.reset();
      });
    }
  }
}
