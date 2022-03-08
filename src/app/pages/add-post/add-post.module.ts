import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TagInputModule } from "ngx-chips";
import { IonicModule } from '@ionic/angular';
import { AddPostPage } from './add-post.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    component: AddPostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    TagInputModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddPostPage]
})
export class AddPostPageModule {}
