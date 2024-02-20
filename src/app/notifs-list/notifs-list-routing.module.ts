import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotifsListPage } from './notifs-list.page';

const routes: Routes = [
  {
    path: '',
    component: NotifsListPage
  },
  {
    path: 'new',
    loadChildren: () => import('./notif-new/notif-new.module').then( m => m.NotifNewPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./notif/notif.module').then( m => m.NotifPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifsListPageRoutingModule {}
