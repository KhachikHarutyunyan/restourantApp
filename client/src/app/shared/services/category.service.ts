import { Injectable } from '../../../../node_modules/@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';
import { Category, Message } from '../interfaces';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  domain = 'http://localhost:3000/api/';
  private options;


  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  createHeader() {
    this.auth.loadToken();
    this.options = {
      headers: new Headers({
        'Content-Type': 'aplication/json',
        'authorization': this.auth.authToken
      })
    };
  }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/category');
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/api/category/${id}`);
  }

  create(category: object, image: File): Observable<Category> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('title', category['title']);
    fd.append('body', category['body']);

    return this.http.post<Category>('/api/category', fd);
  }

  update(id: string, category: object, image: File): Observable<Category> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('title', category['title']);
    fd.append('body', category['body']);

    return this.http.patch<Category>(`/api/category/${id}`, fd);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`);
  }

}

