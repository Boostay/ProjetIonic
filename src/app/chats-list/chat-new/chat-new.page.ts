import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ChatService } from 'src/app/chat.service';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-chat-new',
  templateUrl: './chat-new.page.html',
  styleUrls: ['./chat-new.page.scss'],
})
export class ChatNewPage implements OnInit {
  public chat!: Chat;

  constructor(
    private Chat: ChatService,
    private toastCtrl: ToastController,
    private router : Router
  ) { }

  ngOnInit() {
    this.chat = new Chat();
  }

  async presentToast(Message : string) {
    const toast = this.toastCtrl.create({
      message: Message,
      duration: 2000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/chats']);
      }, 2000);
    });
  }

  add() {
    if(this.chat.name === '' || this.chat.race === '' || this.chat.pictureLink === '' || this.chat.age === null || this.chat.mignonerie === null) {
      this.presentToast('Erreur : Tous les champs doivent être remplis');
    }
    else {
      this.Chat.saveNewChat(this.chat).subscribe(() => {
        this.chat = new Chat();
        this.presentToast('Nouveau Chat enregistré');
      });
    }
  }
}
