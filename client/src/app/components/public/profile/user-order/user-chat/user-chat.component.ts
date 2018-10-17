import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from '../../../../../shared/services/chat.service';
import { Message } from '../../../../../shared/interfaces';
import { MaterialService } from '../../../../../shared/classes/material.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {

  message = '';
  email: string;
  newMessage = [];
  oldMessages = [];

  constructor(
    public auth: AuthService,
    private chat: ChatService
  ) {  }

  ngOnInit() {
    this.email = this.auth.userToken.email;
    this.chat.getNewMessage().subscribe(
      data => {
        this.newMessage.push(data);
      }
    );
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

}
