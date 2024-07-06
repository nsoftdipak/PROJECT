import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  userName: string | null = null;
  userId: number | null = null;
  userLeaveBalance: any[] = [];
  userLeaveStatus: any[] = [];
  userData: any = {};

  constructor(private reportsService: ReportsService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.reportsService.getUserName();
    this.userId = this.reportsService.getUserId();
    console.log(`Creating report for user: ${this.userName} (ID: ${this.userId})`);
    this.getUserLeave();
    this.getUserLeaveStatus();
    this.getUserData();
  }

  getUserLeave(): void {
    if (this.userId !== null) {
      this.reportsService.getUserLeaveBalance().subscribe(
        (response) => {
          this.userLeaveBalance = response;
        },
        (error) => {
          console.error('Error fetching user leave balance:', error);
        }
      );
    } else {
      console.error('User ID is not set');
    }
  }

  getUserLeaveStatus(): void {
    if (this.userId !== null) {
      this.reportsService.getUserLeaveStatus().subscribe(
        (response) => {
          this.userLeaveStatus = response;
        },
        (error) => {
          console.error('Error fetching user leave status:', error);
        }
      );
    } else {
      console.error('User ID is not set');
    }
  }

  getUserData(): void {
    if (this.userId !== null) {
      this.reportsService.getUserDetailsById().subscribe(
        (response) => {
          this.userData = response;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('User ID is not set');
    }
  }

  createReport(): void {
    // this.reportsService.setUserData(this.employee.first_name + ' ' + this.employee.last_name, this.employee.id);
    this.router.navigate(['/leave-management/admin-dashboard/reports']);
  }

  navigateToLeaveCalendar(): void {
    // this.reportsService.setUserData(this.employee.first_name + ' ' + this.employee.last_name, this.employee.id);
    this.router.navigate(['/leave-management/admin-dashboard/leave-calendar']);
  }
}
