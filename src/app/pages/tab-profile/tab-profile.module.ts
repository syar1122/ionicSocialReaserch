import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabProfilePage } from './tab-profile.page';
import { TimeAgoPipe } from "time-ago-pipe";
import { TimeAgoModule } from 'src/app/pipes/time-ago.module';
const routes: Routes = [
  {
    path: '',
    component: TabProfilePage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TimeAgoModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabProfilePage]
})
export class TabProfilePageModule {}
