import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-tab-profile',
  templateUrl: './tab-profile.page.html',
  styleUrls: ['./tab-profile.page.scss'],
})
export class TabProfilePage implements OnInit {
  posts;
  user;
  constructor(private themeService: ThemeService, private authService: AuthService, private firebaseService: FirebaseService) { 
    this.firebaseService.myUser$.subscribe(u =>{
      if(!isNullOrUndefined(u)){
        this.user = u
      }
    })
    this.firebaseService.getMyPosts().subscribe(posts=>{
      if(!isNullOrUndefined(posts)){
        this.posts = posts
      }
    })
  }
  
  logout() {
    this.authService.webLogout()
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  
}
