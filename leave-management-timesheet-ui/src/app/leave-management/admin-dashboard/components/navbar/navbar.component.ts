import { Component } from '@angular/core';
import { MasterService } from '../../../../components/services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  dropdownVisible: boolean = false;



  constructor(private masterService:MasterService, private router:Router){}

  showDropdown() {
    this.dropdownVisible = true;
  }

  hideDropdown() {
    this.dropdownVisible = true;
  }

  logout(): void {
    this.masterService.logout();
    this.router.navigate(['/']); // Navigate to home page after logout
  }
}
