import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../components/services/master.service';
import { Router } from '@angular/router';
import { EmployeeServiceService } from './employee-service.service';
import { HttpClient } from '@angular/common/http';

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  country_code: string;
  is_active: boolean;
  location: number;
  date_of_joining: Date;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  selectedEmployee: Employee | null = null;
  visible: boolean = true;
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  loggedInUserId: number | null = null;

  constructor(
    private masterService: MasterService, 
    private router: Router, 
    private employeeService: EmployeeServiceService, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this.masterService.getAdminId();
    this.http.get(`http://localhost:3001/users/data?adminId=${this.loggedInUserId}`)
      .subscribe(
        (response: any) => {
          this.employees = response;
          this.filteredEmployees = response; // Initialize filtered employees
        },
        error => {
          console.error('Error:', error);
        }
      );
  }

  filterEmployees(): void {
    if (!this.searchTerm) {
      this.filteredEmployees = this.employees;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredEmployees = this.employees.filter(employee =>
        employee.first_name.toLowerCase().includes(searchTermLower) ||
        employee.last_name.toLowerCase().includes(searchTermLower) ||
        employee.email.toLowerCase().includes(searchTermLower)
      );
    }
  }

  navigateToEmployeeDetails(employeeId: number): void {
    this.router.navigate(['/leave-management/admin-dashboard/employee-profile', employeeId]);
    this.visible = false; // Hide the employee page when navigating to details
  }

  setManagerValue() {
    this.employeeService.setManagerValue(true);
    this.employeeService.setUserValue(false);
  }

  setUserValue() {
    this.employeeService.setUserValue(true);
    this.employeeService.setManagerValue(false);
  }
}
