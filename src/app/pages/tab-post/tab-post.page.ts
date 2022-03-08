import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PopoverController } from '@ionic/angular';
import { FollowUserComponent } from '../popovers/follow-user/follow-user.component';
import { isNullOrUndefined } from 'util'
@Component({
  selector: 'app-tab-post',
  templateUrl: './tab-post.page.html',
  styleUrls: ['./tab-post.page.scss'],
})
export class TabPostPage implements OnInit {
  posts = [];
  followed:any = []
  userId;
  nickname:string;
  constructor(private firebaseService: FirebaseService,private popoverController:PopoverController) {
    this.firebaseService.getPosts().toPromise().then(data=>{
      data.forEach(doc=>{
        this.posts.push(doc.data())
      })
      })
      this.userId = this.firebaseService.getMyUserId;
      this.followed = this.firebaseService.getFollowed()
   }

  ngOnInit() {
  }
  // addPost() {
  //   this.firebaseService.addPost({
  //     title: 'Pick Pocket',
  //     tags: ['thieves', 'polices'],
  //     content: `Keep close to Nature's heart... and break clear away, once in a while, and climb a mountain or spend a week in the woods. Wash your spirit again`
  //   });
  // }
  async followPerson(ev:Event,id){
    const popover = await this.popoverController.create({
      component:FollowUserComponent,
      componentProps: {
        userId:id,
      },
      translucent: true,
      event: ev
    })
    return await popover.present();
  }
  checkUser(id){
    this.nickname = null
    let arr = []
    arr = this.followed.filter(f=>{
      if(f.userId == id){
        return f.nickname
      }
    })
    if(arr[0]){
      this.nickname = arr[0].nickname
      this.getFollowedUser()
      return true
    }
  }
  getFollowedUser(){
    return this.nickname
  }
  goToProfile(id){
    this.firebaseService.openProfile(id);
  }
  doRefresh(event){
    this.firebaseService.getPosts().toPromise().then(data=>{
      data.forEach(doc=>{
        this.posts.push(doc.data())
      })
      event.target.complete();
      })
  }
}
