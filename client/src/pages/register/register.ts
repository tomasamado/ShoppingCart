import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  user: any = { username: '', email: '', password: '', first_name: '', last_name: '' };
  userP: any ={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public userProvider: UserProvider) {
  }
  registerUser() {
    if (this.user.username == "" || this.user.email == "" || this.user.password == "" ||
        this.user.first_name == "" || this.user.last_name == "") {
        (this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Please fill all the fields',
            buttons: ['OK']
        })).present();
    } else {
        this.userProvider.addUser(this.user).subscribe((result) => {
            this.userP = result
            var pic = {user_id: this.userP.id}
            this.userProvider.addPicture(pic).subscribe((result) => {
                console.log(result);
                });
        this.navCtrl.push(LoginPage)
        }, (err) => {
            let alert = this.alertCtrl.create({
                title: 'Invalid email',
                subTitle: 'Please enter a valid email',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    }
}
  ionViewDidLoad() {
}

}
