import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotifNewPage } from './notif-new.page';

const routes: Routes = [
  {
    path: '',
    component: NotifNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifNewPageRoutingModule {}
