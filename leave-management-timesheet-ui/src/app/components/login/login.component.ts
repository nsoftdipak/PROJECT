import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthServiceService } from '../login-auth-service.service';
import { MasterService } from '../services/master.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private auth: LoginAuthServiceService,
    private router: Router,
    private masterService: MasterService,
  ) {}

  ngOnInit(): void {
    // Check if the page has been reloaded due to navigation
    const refreshed = localStorage.getItem('refreshed');
    if (refreshed) {
      localStorage.removeItem('refreshed');
    } else if (this.auth.isLoggedIn()) {
      // Redirect the user to the appropriate route if already logged in
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        this.navigateBasedOnRole(decodedToken.roles, decodedToken.sub);
      }
    }
  }

  login(): void {
    event?.preventDefault(); 
    if (this.LoginForm.valid) {
      const { email, password } = this.LoginForm.value as { email: string, password: string };
      this.auth.login({ email, password }).subscribe(
        (result: any) => {
          const token = result.access_token;
          localStorage.setItem('token', token); // Store token in local storage
           
          const decodedToken: any = jwtDecode(token);
          this.fetchAndStoreUserData(decodedToken.sub); // Fetch and store user data
          this.navigateBasedOnRole(decodedToken.roles, decodedToken.sub);
        },
        (err: Error) => {
          alert(err.message); // Handle login error
        }
      );
    }
  }

  navigateBasedOnRole(roles: string[], userId: string): void {
    if (roles.includes('Admin')) {
      this.router.navigate([`/leave-management/admin-dashboard`]).then(() => {
        // localStorage.setItem('refreshed', 'true'); // Set the refresh flag
        window.location.reload(); // Force the page to reload
      });
    } else if (roles.some(role => ['user', 'tester', 'developer', 'intern', 'designer', 'analyst'].includes(role))) {
      this.router.navigate([`/leave-management/employee-dashboard`]).then(() => {
        // localStorage.setItem('refreshed', 'true'); // Set the refresh flag
        window.location.reload(); // Force the page to reload
      });
    } else {
      alert('Unknown role');
    }
  }

  fetchAndStoreUserData(userId: string): void {
    this.masterService.getUserData(Number(userId)).subscribe(
      (userData: any) => {
        localStorage.setItem('userData', JSON.stringify(userData)); // Store user data in local storage
      },
      (err: Error) => {
        alert('Failed to fetch user data');
      }
    );
  }
}
