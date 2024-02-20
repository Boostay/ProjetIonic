import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }, {
        path:'home',
        loadChildren: () => import('../home/home.module').then(m=>m.HomePageModule)
      }, {
        path: 'chats',
        loadChildren: () => import('../chats-list/chats-list.module').then(m=>m.ChatsListPageModule)
      }, {
        path: 'notifs',
        loadChildren: () => import('../notifs-list/notifs-list.module').then(m=>m.NotifsListPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
