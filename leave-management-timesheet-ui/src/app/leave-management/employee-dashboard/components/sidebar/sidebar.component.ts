import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: any; // Property to store user details

  constructor() {}

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
}
