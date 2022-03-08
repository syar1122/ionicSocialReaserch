import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FirebaseService } from '../services/firebase.service';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedIn: boolean
  constructor(private authService: AuthService, private router: Router, private firebaseService: FirebaseService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log("AuthGuard")
    this.authService.loggedIn.asObservable().subscribe(loggedIn => {
      this.loggedIn = loggedIn
    });
    // console.log(this.loggedIn,"This.loggedIn")
    if (!this.loggedIn) {
      // console.log("AuthGuard routing to LoginGuard")
      this.router.navigate(['login'])
      return true
    } else {
      // console.log("logged in")
      return true
    }
  }
}
