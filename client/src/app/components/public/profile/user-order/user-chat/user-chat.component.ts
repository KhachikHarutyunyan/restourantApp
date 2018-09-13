import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from '../../../../../shared/services/chat.service';
import { FormGroup } from '@angular/forms';
import { Message } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {

  message;
  email: string;
  newMessage = [];

  constructor(
    public auth: AuthService,
    private chat: ChatService
  ) {  }

  ngOnInit() {
    this.email = this.auth.userToken.email;
    this.chat.getNewMessage().subscribe(
      data => {

        this.newMessage.push(data);
        console.log(this.newMessage);
      }
    );
  }

  send() {
    console.log(this.message);
    const newMessage: Message = {
      email: this.email,
      message: this.message
    };
    console.log(newMessage);
    this.chat.sendMessage(newMessage);
  }

}
