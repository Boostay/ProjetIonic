import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NotifService } from 'src/app/notif.service';
import { Notif } from 'src/app/models/notif.model';

@Component({
  selector: 'app-notif-new',
  templateUrl: './notif-new.page.html',
  styleUrls: ['./notif-new.page.scss'],
})
export class NotifNewPage implements OnInit {
  public notif!: Notif;

  constructor(
    private notifService: NotifService,
    private toastCtrl: ToastController,
    private router : Router
  ) { }

  ngOnInit() {
    this.notif = new Notif();
  }

  async presentToast(Message: string): Promise<void> {
    const toast = this.toastCtrl.create({
      message: Message,
      duration: 2000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/notifs']);
      }, 2000);
    });
  }

  add() {
    const selectedDateStr = this.notif.jour;
    if (selectedDateStr) {
      const now = new Date();
      const selectedTime = this.notif.heure.split(':').map(Number);
      const selectedDate = new Date(selectedDateStr);
      selectedDate.setHours(selectedTime[0], selectedTime[1], 0);

      console.log('Date:', selectedDate);
      console.log('Maintenant:', now);

      if (selectedDate > now) {
        this.notifService.saveNewNotif(this.notif).subscribe(() => {
          this.notifService.sendNotification(this.notif.titre, this.notif.descr, selectedDate);
          console.log('Notification programmée');
          console.log('Date:', selectedDate);
          this.presentToast("Nouvelle notification enregistrée");
        });
      } else {
        console.log('Erreur : La date de la notification est passée, retour au menu');
        this.presentToast("Erreur : La date de la notification est passée, retour au menu");
      }
    }
  }
}
