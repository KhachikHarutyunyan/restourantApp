import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';
import { Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  domain = 'http://localhost:3000/api/';

  constructor(
    private http: HttpClient
  ) { }

  fetch(id: string): Observable<Position[]> {
    return this.http.get<Position[]>(this.domain + `/position${id}`);
  }

  create(position: Position): Observable<Position> {
    return this.http.post<Position>(this.domain + '/position', position);
  }

  // update(position: Position): Observable<Position> {
  //   return this.http.patch<Position>(this.domain + `/position/${position._id}`, position);
  // }

  // delete(position: Position): Observable<Message> {
  //   return this.http.delete<Message>(this.domain + `/position/${position._id}`);
  // }

}
