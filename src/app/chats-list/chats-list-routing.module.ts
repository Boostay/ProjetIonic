import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatsListPage } from './chats-list.page';

const routes: Routes = [
  {
    path: '',
    component: ChatsListPage
  },
  {
    path: 'new',
    loadChildren: () => import('./chat-new/chat-new.module').then( m => m.ChatNewPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsListPageRoutingModule {}
