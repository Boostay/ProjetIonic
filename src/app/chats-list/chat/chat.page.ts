import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ChatService } from 'src/app/chat.service';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  modif: boolean = false;
  chat!: Chat;

  constructor(
    private alertCtrl : AlertController,
    private route: ActivatedRoute,
    private Chat: ChatService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.Chat.get(id).subscribe((value: any) => {
      this.chat = value;
    });
  }

  async setModif() {
    if (!this.modif) {
      const alert = await this.alertCtrl.create({
        header : 'Etes vous sur de vouloir modifier ?',
        subHeader: 'Vous rendrez possible la modification',
        buttons : [
          {
            text: 'Annuler',
            role: 'Cancel'
          }, {
            text: 'Configurer',
            handler: () => { this.modif = !this.modif }
          }
        ]
      });
      await alert.present();
    } else {
      this.modif = !this.modif;
    }
  }

  async presentToast(Message: string) {
    const toast = this.toastCtrl.create({
      message: Message,
      duration: 2000
    });
    (await toast).present();
  }

  onModif() {
    if (!this.chat.name || !this.chat.race || !this.chat.pictureLink || this.chat.age === null || this.chat.mignonerie === null || this.chat.pictureLink === '') {
      this.presentToast('Erreur : Tous les champs doivent être remplis');
    } else {
      this.Chat.update(this.chat).subscribe(() => {
        this.presentToast('Chat modifié avec succès');
        this.modif = false;
      });
    }
  }

  onDelete(id: any) {
    this.Chat.delete(id);
    this.router.navigate(['/chats']);
  }
}
