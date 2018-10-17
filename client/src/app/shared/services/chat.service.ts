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
    this.socket.emit('admin message', message);
  }

  chatMessage(message: Message) {
    this.socket.emit('admin message', message);
  }

  public getNewMessage = () => {
    return Observable.create((observer) => {
      this.socket.on('privat chat', (message) => {
        observer.next(message);
      });
    });
  }

  public getAdminMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('privat chat', (message) => {
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
