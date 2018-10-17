import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token = null;
  public userToken = null;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {}

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register/', user);
  }

  login(user: User): Observable<{token: string, user: User}> {
    return this.http.post<{token: string, user: User}>('/api/auth/login', user)
        .pipe(
          tap(
            // tslint:disable-next-line:no-shadowed-variable
            ({ token, user }) => {
              localStorage.setItem('auth-token', token);
              localStorage.setItem('user', JSON.stringify(user));
              this.setToken(token);
            }
          )
        );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  loadUserToken() {
    this.userToken = JSON.parse(localStorage.getItem('user'));
    return this.userToken;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  isLoggedIn(): boolean {
    const token = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }
    const tokenExpired = this.jwtHelperService.isTokenExpired(token);
    return !tokenExpired;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
    this.userToken = null;
  }

  getAllUsers() {
    return this.http.get('api/auth/users');
  }
}
