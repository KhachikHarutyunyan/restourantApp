import { Injectable } from '../../../../node_modules/@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { User } from '../interfaces';
import { Observable } from '../../../../node_modules/rxjs';
import { tap } from '../../../../node_modules/rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  domain = 'http://localhost:3000/api/';

  private token = null;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register/', user);
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>(this.domain + 'auth/login', user)
        .pipe(
          tap(
            ({ token }) => {
              localStorage.setItem('auth-token', token);
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

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }

}
