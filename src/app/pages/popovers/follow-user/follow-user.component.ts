import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.scss'],
})
export class FollowUserComponent implements OnInit {
  input = null;
  @Input("userId") userId;
  form: FormGroup
  constructor(private popOverController: PopoverController, private firebaseService: FirebaseService, private formBuilder: FormBuilder, private toastController: ToastController) {
    this.form = this.formBuilder.group({
      input: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
    })
  }

  ngOnInit() {

  }
  submit() {
    this.firebaseService.followUser(this.userId, this.form.value.input)
    this.popOverController.dismiss()
    this.presentToast()
  }
  cancel() {
    this.popOverController.dismiss()
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings will be displayed after a reload.',
      duration: 2000
    });
    toast.present();
  }

}
