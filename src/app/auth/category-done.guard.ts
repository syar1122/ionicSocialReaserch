import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryDoneGuard implements CanActivate {
  categoryDone: boolean;
  constructor(private router: Router, private firebaseService: FirebaseService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log("CategoryDoneGuard")
    if(localStorage.getItem('categories')){
      this.router.navigate(['tabs/tab-post'])
      return false
    }else{
      return this.firebaseService.getMyBool().toPromise().then(data => {
        if (data) {
          // console.log("CategoryDoneGuard routing to AuthGuard")
          localStorage.setItem('categories',JSON.stringify(data))
          this.router.navigate(['tabs/tab-post'])
          return false;
        } else {
          // console.log(this.categoryDone, "Cat Does not exists")
          return true;
        }
      }) 
    }
  }
}
