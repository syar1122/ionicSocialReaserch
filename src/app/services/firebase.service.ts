import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, pipe, Observable } from 'rxjs';
import { map, take, switchMap, first } from "rxjs/operators";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  myUser$: Observable<User | null>;
  myId: string;
  userId: string;
  categoryDone: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private afs: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) {
    this.myUser$ = this.afAuth.authState;
    this.myUser$.subscribe(user => {
      if (!isNullOrUndefined(user)) {
        this.myId = user.uid
      }
    })
  }
  /* ----------------------------------------------My Self---------------------------------------- */
  get getMyUserId() {
    return this.myId;
  }

  getMyBool(): Observable<boolean> {
    return this.afs.collection('users').doc(this.myId).collection('categories').get().pipe(
      map(data => {
        if (data.size > 0) {
          console.log("exists")
          return true
        } else {
          console.log("not exists")
          return false
        }
      }),
      // if you need
      // tap(bool => this.categoryDone.next(bool))
    )
  }
  
  getMyPosts(): Observable<any> {
    return this.afs.collection('posts', ref => {
      return ref.where('userId', '==', this.myId)
    }).valueChanges()
  }
  getPosts() {
    return this.afs.collection('posts').get()
  }
  getCategories() {
    let n = this.afs.collection('categories').valueChanges();
    if (n != null) {
      this.categoryDone.next(true)
    } else {
      this.categoryDone.next(false)
    }
    return n
  }
  get getMyCategories() {
    return this.myUser$.subscribe(user => {
      return this.afs.doc(`users/${user.uid}`).collection('categories').valueChanges();
    })
  }
  setMyCategories(data) {
    this.myUser$.subscribe(user => {
      data.forEach(element => {
        //Firebase works with pure javascript objects so i should convert it using object.assign or json.parse(json.stringify(element))
        this.afs.collection('users').doc(user.uid).collection('categories').add(Object.assign(element))
      });
      localStorage.setItem('categories', JSON.stringify(data))
    })
    this.categoryDone.next(true)
    this.router.navigate(['tabs/tab-profile'])
  }
  editMyCategories(data) {
    this.myUser$.subscribe(user => {
      let catid = this.categoryId();
      this.afs.collection('users').doc(user.uid).collection('categories').doc(JSON.stringify(catid)).set(data, { merge: true })
    })
  }
  categoryId() {
    this.myUser$.subscribe(user => {
      return this.afs.collection('users').doc(user.uid).collection('categories').snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          // const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return id;
        });
      }))
    })
  }
  addPost(value) {
    let tags = [];
    value.tags.forEach(element => {
      tags.push(element.value)
    });
    const data = {
      userId: this.myId,
      title: value.title,
      date: new Date(),
      tags: tags,
      content: value.content
    };
    return this.afs.collection('posts').add(data);
  }
  followUser(id, nickname) {
    this.afs.collection('users').doc(this.myId).collection('followedUsers').add({
      userId: id,
      nickname: nickname
    })
  }
  getFollowed() {
    let arr = []
    this.afs.collection('users').doc(this.myId).collection('followedUsers').get().toPromise().then(data => {
      data.forEach(doc => {
        arr.push(doc.data())
      })
    })
    return arr
  }
  openProfile(id) {
    this.userId = id;
    this.router.navigate(['user-profile']);
  }
  get getUserId() {
    return this.userId;
  }
  getUserNicknameAndId():Observable<any> {
     return this.afs.collection('users').doc(this.myId).collection('followedUsers',ref=>{
      return ref.where('userId','==',this.userId)
    }).get().pipe(map(data => {
      return data.docs[0].data()
    }))
    
  }
  getUserCategories():Promise<any>{
    let arr=[]
    return this.afs.collection('users').doc(this.myId).collection('categories').get().toPromise().then(data=>{
      data.forEach(doc=>{
        arr.push(doc.data())
      })
      return arr
    })
    
  }
}
