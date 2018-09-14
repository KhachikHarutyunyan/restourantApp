import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket;
  domain = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {
    this.socket = io(this.domain);
  }

  sendMessage(message: Message) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
     return Observable.create((observer) => {
       this.socket.on('message', (message) => {
         observer.next(message);
       });
     });
  }

  postMessage(message: Message) {
    return this.http.post('/api/chat', message);
  }

  getUserMessage(id) {
    return this.http.get(`/api/chat/${id}`);
  }

}
