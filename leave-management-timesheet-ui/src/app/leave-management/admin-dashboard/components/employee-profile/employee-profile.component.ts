import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../components/services/master.service';
import { Employee } from '../employee/employee.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '../reports/reports.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  employee: any;
  selectedAction: string = 'Actions';


  constructor(
    private route: ActivatedRoute,
    private masterService: MasterService,
    private router: Router,
    private reportsService: ReportsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const employeeId = Number(params.get('id'));
      if (employeeId) {
        this.masterService.getUserDetailsById(employeeId).subscribe((data: Employee) => {
          this.employee = data;
        });
      }
    });
  }

  createReport(): void {
    this.reportsService.setUserData(this.employee.first_name + ' ' + this.employee.last_name, this.employee.id);
    this.router.navigate(['/leave-management/admin-dashboard/reports']);
  }

  navigateToLeaveCalendar(): void {
    this.reportsService.setUserData(this.employee.first_name + ' ' + this.employee.last_name, this.employee.id);
    this.router.navigate(['/leave-management/admin-dashboard/leave-calendar']);
  }

  
}
