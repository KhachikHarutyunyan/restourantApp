import { Injectable } from '../../../../node_modules/@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { User } from '../interfaces';
import { Observable } from '../../../../node_modules/rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  domain = 'http://localhost:3000/api/';

  constructor(
    private http: HttpClient
  ) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.domain + 'auth/register', user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.domain + 'auth/login', user);
  }

}
