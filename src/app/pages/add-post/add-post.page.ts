import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';
export interface AutoCompleteModel {
  value: any;
  display: string;
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {
  postForm: FormGroup
  constructor(private router:Router,private formBuilder: FormBuilder, private firebaseService: FirebaseService, private afs: AngularFirestore) {
    this.postForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([Validators.required,Validators.maxLength(16)])),
      content: new FormControl('', Validators.compose([Validators.required])),
      tags: new FormControl('', Validators.compose([Validators.required]))
    })
  }
  ngOnInit() {
  }
  onSubmit(form) {
    console.log(form.value)
    this.firebaseService.addPost(form.value)
    this.postForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([Validators.required,Validators.maxLength(16)])),
      content: new FormControl('', Validators.compose([Validators.required])),
      tags: new FormControl('', Validators.compose([Validators.required]))
    })
    this.router.navigate(['tabs/tab-post']);
  }
  public requestAutocompleteItems = (text: string): Observable<any> => {
    //needs optimization this query must run one time not every time the method is called
    return this.afs.collection('tags').valueChanges().pipe(map((data: any) => data.map(item => item)))
  };
}
