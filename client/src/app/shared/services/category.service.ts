import { Injectable } from '../../../../node_modules/@angular/core';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';
import { Category, Message } from '../interfaces';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  domain = this.auth.domain;
  private options;


  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  createHeader() {
    this.auth.loadToken();
    this.options = new HttpHeaders({
      'authorization': this.auth.authToken, 'Content-Type': 'application/json'
    });
  }

  // private newHeader = new HttpHeaders({
  //   'Authorization': this.auth.authToken, 'Content-Type': 'application/json'
  // });

  fetch(): Observable<Category[]> {
    this.createHeader();
    return this.http.get<Category[]>(this.domain + 'category', { headers: this.options });
  }

  getById(id: string): Observable<Category> {
    this.createHeader();
    return this.http.get<Category>(this.domain + `category/${id}`, { headers: this.options });
  }

  create(category: object, image: File): Observable<Category> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('title', category['title']);
    fd.append('body', category['body']);

    return this.http.post<Category>(this.domain + 'category', fd, { headers: this.options });
  }

  update(id: string, category: object, image: File): Observable<Category> {
    const fd = new FormData();

    this.createHeader();

    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('title', category['title']);
    // fd.append('body', category['body']);
    console.log(fd);

    return this.http.patch<Category>(this.domain + `category/${id}`, fd, { headers: this.options });
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(this.domain + `category/${id}`);
  }

}

