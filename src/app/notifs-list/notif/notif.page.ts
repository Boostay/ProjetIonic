import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { NotifService } from 'src/app/notif.service';
import { Notif } from 'src/app/models/notif.model';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.page.html',
  styleUrls: ['./notif.page.scss'],
})
export class NotifPage implements OnInit {
  modif: boolean = false;
  notif!: Notif;

  constructor(
    private alertCtrl : AlertController,
    private route: ActivatedRoute,
    private Notif: NotifService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.Notif.get(id).subscribe((value: any) => {
      this.notif = value;
    });
  }

  async setModif() {
    if(!this.modif) {
      const alert = await this.alertCtrl.create({
        header : 'Etes vous sur de vouloir modifier ?',
        subHeader: 'Vous rendrez possible la modification',
        buttons : [
          {
            text: 'Annuler',
            role: 'Cancel'
          }, {
            text: 'Configurer',
            handler: () => {this.modif = !this.modif}
          }
        ]
      });
      await alert.present();
    } else {
      this.modif = !this.modif;
    }
  }

  async presentToast(Message : string) {
    const toast = this.toastCtrl.create({
      message: Message,
      duration: 2000
    });
    (await toast).present();
  }

  onModif() {
    if (!this.notif.titre || !this.notif.jour || !this.notif.heure || !this.notif.descr) {
      this.presentToast('Erreur : Tous les champs doivent être remplis');
    } else {
      this.Notif.update(this.notif).subscribe(() => {
        this.presentToast('Vos modifications sont enregistrées');
        this.modif = false;
      });
    }
  }

  onDelete(id: any) {
    this.Notif.delete(id);
    this.router.navigate(['/notifs']);
  }
}
