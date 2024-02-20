import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifsListPageRoutingModule } from './notifs-list-routing.module';

import { NotifsListPage } from './notifs-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotifsListPageRoutingModule
  ],
  declarations: [NotifsListPage]
})
export class NotifsListPageModule {}
