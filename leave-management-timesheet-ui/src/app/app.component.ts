import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'leave-management-timesheet-ui';
  hideNavbar = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hideRoutes = ['/leave-management/admin-dashboard', '/leave-management/employee-dashboard'];
        this.hideNavbar = hideRoutes.some(route => event.urlAfterRedirects.includes(route));
      }
    });
  }
}
