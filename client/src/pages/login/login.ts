import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
import { ProductProvider } from '../../providers/product/product';
import { TokenProvider } from '../../providers/token/token';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  someForm: FormGroup;
  userLogin = { username: '', password: '' };
  userId = 0;
  token: any;
  jwtHelper: JwtHelper = new JwtHelper();
  loading: any;

  constructor(private loadingCtrl: LoadingController, public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams, private alertCtrl: AlertController, public userProvider: UserProvider, private storage: Storage, public productProvider: ProductProvider, public tokenProvider: TokenProvider) {
    this.someForm = formBuilder.group({
      'input1': ['', Validators.compose([Validators.required])],
      'input2': ['', Validators.compose([Validators.required])]
    });
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

  }

  ionViewDidLoad() {
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    this.loading.present();

    this.userProvider.login(this.userLogin).subscribe((result: any) => {

      this.token = result;

      this.storage.set('JWT', this.token.access);
      this.loading.dismiss();

      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      setTimeout(() => {
        this.navCtrl.push(LoginPage);
      });
      if (err.status === 500) {
        let alert = this.alertCtrl.create({
          title: 'Server Error',
          // subTitle: 'Combination user/password incorrect',
          buttons: ['Dismiss']
        });

        alert.present();

      }
      if (err.status === 0) {
        console.log('cors')

      }
      if (err.status === 400) {
        let alert = this.alertCtrl.create({
          title: 'Invalid Credentials',
          subTitle: 'Combination user/password incorrect',
          buttons: ['Dismiss']
        });

        alert.present();
      }
      console.log(err)
    });
  }


}
