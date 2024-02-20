import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Notif } from './models/notif.model';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';


@Injectable({
  providedIn: 'root'
})
export class NotifService {
  private dbPath = '/notif';
  notifsRef: AngularFirestoreCollection<Notif>;


  constructor(
    private toastCtrl: ToastController,
    private db: AngularFirestore
  ) {
    this.notifsRef = db.collection(this.dbPath);
  }

  getAll() : any {
    return this.notifsRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc:any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
        })
      })
    );
  }

  saveNewNotif(notif: Notif) : any {
    return new Observable(obs => {
      this.notifsRef.add({...notif}).then(() => {
        obs.next();
      });
    });
  }

  get(id: any):any {
    return  new Observable(obs => {
      this.notifsRef.doc(id).get().subscribe(res => {
        obs.next({id: res.id, ...res.data()});
      });
    });
  }

  update(notif:Notif) {
    return new Observable(obs => {
      this.notifsRef.doc(notif.id).update(notif);
      obs.next();
    });
  }

  delete(id: any) {
    this.db.doc(`notif/${id}`).delete();
  }

  async sendNotification(titre: string, message: string, date: Date) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: titre,
            body: message,
            id: Math.floor(Math.random() * 10000),
            schedule: { at: date },
          }
        ]
      });

      this.presentToast('Notification programmée');
    } catch (error) {
      console.error('Erreur lors de la planification de la notification:', error);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
