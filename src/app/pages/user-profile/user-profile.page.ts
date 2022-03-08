import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
userId:string;
nickname;
user;
  constructor(private firebaseService:FirebaseService) {
    this.userId = this.firebaseService.getUserId
    this.firebaseService.getUserNicknameAndId().subscribe(data=>{
      if(!isNullOrUndefined(data)){
        this.user = data
      }
    })
   }
  ngOnInit() {
  }

}
