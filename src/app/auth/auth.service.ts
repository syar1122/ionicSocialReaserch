import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Facebook } from "@ionic-native/facebook/ngx";
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private fb: Facebook, private zone: NgZone, private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    this.getStatus()
  }

  getStatus() {
    return new Promise<any>((resolve) => {
      firebase.auth().onAuthStateChanged(firebaseUser => {
        this.zone.run(() => {
          if (firebaseUser) {
            this.loggedIn.next(true)
            this.user.next(firebaseUser)
            resolve(true)
          } else {
            this.loggedIn.next(false)
            this.user.next(null)
            resolve(false)
          }
        });
      });
    })
  }
  getId() {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser.uid)
        this.user.next(firebaseUser)
        return (firebaseUser.uid)
      } else {
        return (null)
      }
    })
  }
  login(): Promise<any> {
    return this.fb.login(['email']).then((response) => {
      let credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken)
      this.afAuth.auth.signInWithCredential(credential).then((info) => {
        this.user.next(info.user)
        this.loggedIn.next(true)
        this.router.navigate(['categories'])
        return this.updateUserDataWeb(info.user)
      }).catch(function (error) {
        console.log(error)
      })
    })
  }
  webLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider).then(() => {
        firebase.auth().getRedirectResult().then(res => {
          resolve(res);
          this.user.next(res.user)
          this.loggedIn.next(true)
          this.router.navigate(['categories'])
          return this.updateUserDataWeb(res.user)
        }).catch(function (error) {
          console.log(error)
          reject(error)
        })
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }
  webLogout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login'])
      console.log("Logged Out");
      // this.authState = null
      // this.user.next(null)
      // this.loggedIn.next(false)
    }, err => {
      console.log("Failed to Signout")
    });

  }
  get userData() {
    return this.user
  }
  private updateUserDataWeb(value) {
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${value.uid}`);

    const data = {
      uid: value.uid,
      email: value.email,
      displayName: value.displayName,
      phone: value.phoneNumber,
      picture: value.photoURL
    };
    return userRef.set(data, { merge: true });
  }
}
