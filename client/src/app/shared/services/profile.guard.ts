import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  redirectUrl: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isLoggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // return this.canActivate(route, state);
    this.auth.loadUserToken();
    const user  = this.auth.userToken;
    // const user = this.auth.loadUserToken();
    if (user) {
      if (!user['admin']) {
        return true;
      } else {
        if (user['admin']) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/login']);
          return false;
        }

      }
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
