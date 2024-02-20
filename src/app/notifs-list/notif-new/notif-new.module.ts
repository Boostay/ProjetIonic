import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifNewPageRoutingModule } from './notif-new-routing.module';

import { NotifNewPage } from './notif-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotifNewPageRoutingModule
  ],
  declarations: [NotifNewPage]
})
export class NotifNewPageModule {}
