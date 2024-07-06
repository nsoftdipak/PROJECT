import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: any; // Property to store user details

  constructor(private router: Router) { }


  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      console.error('User details not found in local storage');
    }
  }

  isEmployeeRelatedPage(): boolean {
    const url = this.router.url;
    return (
      url.includes('/leave-management/admin-dashboard/employee-profile/') ||
      url === '/leave-management/admin-dashboard/holiday' ||
      url === '/leave-management/admin-dashboard/employee-timeoff' ||
      url === '/leave-management/admin-dashboard/Compensatory-Request' ||
      url === '/leave-management/admin-dashboard/view' ||
      url === '/leave-management/admin-dashboard/report'
    );
  }


  isManagePage(): boolean {
    const url= this.router.url;
    return (
      url.includes( '/leave-management/admin-dashboard/manage')||
    url==='/leave-management/admin-dashboard/leave-request-setting'||
    url==='/leave-management/admin-dashboard/holiday'||
    url==='/leave-management/admin-dashboard/leave-request-setting'||
    url==='/leave-management/admin-dashboard/Compensatory-Request'
      

  );
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
