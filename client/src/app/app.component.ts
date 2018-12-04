import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TokenProvider } from '../providers/token/token';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  currentUser:any;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public tokenProvider: TokenProvider) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.show();
      this.tokenProvider.getFromStorage().then((result) => {
        this.currentUser = result; 
        this.rootPage = this.currentUser ? HomePage : LoginPage;
      });
    });
  }
}

