import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket;

  constructor() { }

  // connect(): Rx.Subject

  // let observable = new Observable(observer => {
  //   this.socket.on('message', (data) => {
  //     console.log('Receved message from WBSOcket');
  //     observer.next(data);
  //   });
  //   return () => {
  //     this.socket.disconnect();
  //   }
  // });

}
