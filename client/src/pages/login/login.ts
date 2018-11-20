import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userLogin = { username: '', password: '' };
  userId = 0;
  token: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public userProvider: UserProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

  login() {

    this.userProvider.login(this.userLogin).then((result) => {

      this.token = result;

      this.storage.set('JWT', this.token.access);

      var decoded = this.jwtHelper.decodeToken(this.token.access);

      this.userId = decoded.user_id;

      this.navCtrl.push(HomePage, { userId: this.userId });
      
    }, (err) => {

      let alert = this.alertCtrl.create({
        title: 'Invalid Credentials',
        subTitle: 'Combination user/password incorrect',
        buttons: ['Dismiss']
      });

      alert.present();
    });
  }

}
