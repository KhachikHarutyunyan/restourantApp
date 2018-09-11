import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  redirectUrl: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.auth.loadUserToken();
    if (user) {
      if (user['admin']) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
