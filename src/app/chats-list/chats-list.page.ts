import { Component, OnInit } from '@angular/core';
import { Chat } from '../models/chat.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.page.html',
  styleUrls: ['./chats-list.page.scss'],
})
export class ChatsListPage implements OnInit {
  chats!: Array<Chat>;

  constructor(
    private Chat: ChatService
  ) { }

  ngOnInit() {
    this.Chat.getAll().subscribe((data: any) => {
      this.chats = data;
    });
  }

}
