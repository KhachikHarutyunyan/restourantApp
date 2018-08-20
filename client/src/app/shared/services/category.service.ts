import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Message } from '../interfaces';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {


  constructor(
    private http: HttpClient
  ) {}

  // createHeader() {
  //   this.auth.loadToken();
  //   this.options = new HttpHeaders({
  //     'authorization': this.auth.authToken, 'Content-Type': 'application/json'
  //   });
  // }

  // private newHeader = new HttpHeaders({
  //   'Authorization': this.auth.authToken, 'Content-Type': 'application/json'
  // });

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category');
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`);
  }

  create(category: object, image: File): Observable<Category> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('title', category['title']);
    fd.append('name', category['name']);

    return this.http.post<Category>('/api/category', fd);
  }

  update(id: string, category: object, image: File): Observable<Category> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('title', category['title']);
    fd.append('name', category['name']);
    console.log('service FD', fd);
    console.log('service category', category['title']);

    return this.http.patch<Category>(`/api/category/${id}`, fd);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`);
  }

}

