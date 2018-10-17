import { MaterialService } from './../../../classes/material.service';
import { MaterialInstance } from 'src/app/shared/classes/material.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { Message } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss']
})
export class AdminChatComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chat')
  toggleChatRef: ElementRef;

  chatInstans: MaterialInstance;
  users = [];
  choosedUser = [];
  showChat = true;
  minimize = false;

  message = '';
  email: string;
  newMessage = [];
  oldMessages = [];

  constructor(
    public auth: AuthService,
    private chat: ChatService,
    ) {}

  ngOnInit() {
// tslint:disable-next-line:max-line-length
// https://github.com/ShankyTiwari/Real-time-private-chatting-app-using-Angular-Nodejs-mongodb-and-Socket.io/blob/master/Nodejs%20API/web/socket.js
    this.auth.getAllUsers().subscribe(
      (data: any[]) => {
        console.log(data);
        // console.log(this.auth.userToken);
        this.users = this.users.concat(
          data.map(u => {
            if (u._id !== this.auth.userToken._id) {
              return u;
            } else {
              return false;
            }
          })
        );
        console.log(this.users);
      },
      err => {
        MaterialService.toast(err.error.message);
      }
    );
    this.email = this.auth.userToken.email;

    this.chat.getNewMessage().subscribe(data => {
      this.newMessage.push(data);
    });
    this.getUserMessages(this.auth.userToken._id);

  }

  getUserMessages(id) {
    this.chat.getUserMessage(id).subscribe(
      data => {
        this.oldMessages.push(data);
      }
    );
  }

  send() {
    const newMessage: Message = {
      email: this.email,
      message: this.message,
      userId: this.auth.userToken._id
    };

    this.chat.postMessage(newMessage).subscribe(
      data => {
        this.message = '';
        this.chat.sendMessage(newMessage);
      },
      error => {
        MaterialService.toast('Something went wrong');
      }
    );
  }


  ngAfterViewInit() {
    this.chatInstans = MaterialService.asideCart(this.toggleChatRef);
  }

  ngOnDestroy() {
    this.chatInstans.destroy();
  }

  close() {
    // http://cidcode.net/csschat/
    this.chatInstans.close();
  }

  onUser(user) {
    console.log(user);
    this.choosedUser = user;
    this.minimize = false;
  }

  closeChat() {
    this.choosedUser = [];
    this.minimize = !this.minimize;
  }

}
