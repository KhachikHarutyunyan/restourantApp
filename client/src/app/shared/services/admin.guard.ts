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
    // return this.canActivate(route, state);
    const user = this.auth.loadUserToken();
    if (user) {
      if (user['admin']) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
  }

/*
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.auth.isAuthenticated()) {
      return of(true);
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          accessDenied: true
        }
      });
      return of(false);
    }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
    // const loggedUser = this.auth.getLoggedInUser();
    // if (loggedUser['admin']) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
*/
}
