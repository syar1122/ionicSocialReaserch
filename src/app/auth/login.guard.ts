import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FirebaseService } from '../services/firebase.service';
import { map } from 'rxjs/operators'
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  loggedIn;
  constructor(private authService: AuthService, private router: Router, private firebaseService: FirebaseService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log("LoginGuard")
    return this.authService.getStatus().then(
      data => {
        if (data) {
          // console.log("LoginGuard routing to CategoryDoneGuard")
          this.router.navigate(['categories'])
          return true
        } else {
          // console.log("Not logged in")
          return true

        }
      })
  }
}
