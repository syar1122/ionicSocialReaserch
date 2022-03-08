import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './services/theme.service';
import { timer } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { IonRouterOutlet, AlertController, Platform } from "@ionic/angular";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
  showSplash = true
  isLight = true;
  backButtonSubscription;
  currentUrl;
  previousUrl;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private themeService: ThemeService,
    private router: Router,
    private alertCtrl: AlertController,
    private activeRoute: ActivatedRoute
  ) {
    this.initializeApp();
    this.isLight = !this.themeService.getTheme();
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      //route.url must be the first statement because the router can always go back because the root page is login
      if (this.router.url == '/tabs/tab-post') {
        navigator['app'].exitApp()
      }
      else if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp()
          }
        }
      ]
    });

    await alert.present();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.backButtonSubscription.unsubscribe();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(1000).subscribe(() => {
        this.showSplash = false
      })
    }).catch(err => {
      alert(err)
    });
  }
}
