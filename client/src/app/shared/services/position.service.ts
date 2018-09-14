import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, Positions } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  domain = 'http://localhost:3000/api/';

  constructor(
    private http: HttpClient
  ) { }

  fetch(id: string): Observable<Positions[]> {
    return this.http.get<Positions[]>(`/api/position/${id}`);
  }

  create(position: Positions): Observable<Positions> {
    return this.http.post<Positions>('/api/position/', position);
  }

  update(position: Positions): Observable<Positions> {
    return this.http.patch<Positions>(`/api/position/${position['_id']}`, position);
  }

  delete(position: Positions): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${position['_id']}`);
  }

}
