import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'tab-poll', loadChildren: '../tab-poll/tab-poll.module#TabPollPageModule', canActivate: [AuthGuard] },
      { path: 'tab-post', loadChildren: '../tab-post/tab-post.module#TabPostPageModule', canActivate: [AuthGuard] },
      { path: 'tab-question', loadChildren: '../tab-question/tab-question.module#TabQuestionPageModule', canActivate: [AuthGuard] },
      { path: 'tab-notification', loadChildren: '../tab-notification/tab-notification.module#TabNotificationPageModule', canActivate: [AuthGuard] },
      {
        path: 'tab-profile', children:
          [
            { path: '', loadChildren: '../tab-profile/tab-profile.module#TabProfilePageModule', canActivate: [AuthGuard] },
            { path: 'settings-modal', loadChildren: '../tab-profile/settings-modal/settings-modal.module#SettingsModalPageModule', canActivate: [AuthGuard] },
          ]
      },
    ]
  },
  { path: '', redirectTo: '/tabs/tab-poll', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
