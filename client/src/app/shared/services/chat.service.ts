import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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

  sendMessage(message) {
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

}
