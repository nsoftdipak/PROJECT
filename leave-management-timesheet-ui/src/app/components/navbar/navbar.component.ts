import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  
  hideNavbar = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Adjust these paths to match your actual routes
        const hideRoutes = ['/leave-management/admin-dashboard', '/leave-management/employee-dashboard'];
        this.hideNavbar = hideRoutes.some(route => event.urlAfterRedirects.includes(route));
      }
    });
  }
  
  closeMenu() {
    const checkbox = document.getElementById('navbar-toggle') as HTMLInputElement;
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  }
}
