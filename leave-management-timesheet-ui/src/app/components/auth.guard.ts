import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MasterService } from './services/master.service';
import { LoginAuthServiceService } from './login-auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginAuthServiceService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
