import { Injectable } from '../../../../node_modules/@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  domain = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) {}

  ggAuth() {
    return this.http.get(this.domain + 'auth/google');
  }

}
