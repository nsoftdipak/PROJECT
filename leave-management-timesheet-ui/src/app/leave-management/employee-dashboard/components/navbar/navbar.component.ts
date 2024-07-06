// src/app/components/navbar/navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../components/services/master.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userDetails: any; // Property to store user details
  isAuthenticated: boolean = false; // Property to track authentication status


  constructor(private masterService: MasterService, private router:Router) {}

  ngOnInit(): void {
    this.getData(); // Fetch user details on component initialization
  }

  getData(): void {
    this.masterService.getUserDetails().subscribe(
      details => {
        this.userDetails = details; // Store user details
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  logout(): void {
    this.masterService.logout();
    this.router.navigate(['/']); // Navigate to home page after logout
  }
}
