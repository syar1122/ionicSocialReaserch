import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabPostPage } from './tab-post.page';
import { FollowUserComponent } from "../popovers/follow-user/follow-user.component";
import {TimeAgoPipe} from 'time-ago-pipe';
import { TimeAgoModule } from 'src/app/pipes/time-ago.module';
const routes: Routes = [
  {
    path: '',
    component: TabPostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TimeAgoModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[FollowUserComponent],
  declarations: [TabPostPage,FollowUserComponent]
})
export class TabPostPageModule {}
