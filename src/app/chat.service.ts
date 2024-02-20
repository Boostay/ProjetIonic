import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Chat } from './models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private dbPath = '/chat';
  chatsRef: AngularFirestoreCollection<Chat>;


  constructor(
    private db: AngularFirestore
  ) {
    this.chatsRef = db.collection(this.dbPath);
  }

  getAll() : any {
    return this.chatsRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc:any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
        })
      })
    );
  }

  saveNewChat(chat: Chat) : any {
    return new Observable(obs => {
      this.chatsRef.add({...chat}).then(() => {
        obs.next();
      });
    });
  }

  get(id: any):any {
    return  new Observable(obs => {
      this.chatsRef.doc(id).get().subscribe(res => {
        obs.next({id: res.id, ...res.data()});
      });
    });
  }

  update(chat:Chat) {
    return new Observable(obs => {
      this.chatsRef.doc(chat.id).update(chat);
      obs.next();
    });
  }

  delete(id: any) {
    this.db.doc(`chat/${id}`).delete();
  }
}
