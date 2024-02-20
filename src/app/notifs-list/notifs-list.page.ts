import { Component, OnInit } from '@angular/core';
import {Notif} from "../models/notif.model";
import { NotifService } from '../notif.service';

@Component({
  selector: 'app-notifs-list',
  templateUrl: './notifs-list.page.html',
  styleUrls: ['./notifs-list.page.scss'],
})
export class NotifsListPage implements OnInit {
  notifs!: Array<Notif>;

  constructor(private Notif : NotifService) { }

  ngOnInit() {
    this.Notif.getAll().subscribe((data: any) => {
      this.notifs = data;
    });
  }

}
