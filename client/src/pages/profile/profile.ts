import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyProductsPage } from '../my-products/my-products';
import { AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userLogin = { username: '', password: '' };
  user: any;
  newPassword:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public userProvider: UserProvider) {
    this.user = navParams.get('user');
    console.log(this.user)
  }
  myProducts() {
    this.navCtrl.push(MyProductsPage);
  }

  changePassword() {
    let alert = this.alertCtrl.create({
      title: 'Change password',
      inputs: [
        {
          name: 'currentPassword',
          placeholder: 'Enter your current password',
          type: 'password'

        },
        {
          name: 'newPassword',
          placeholder: 'Enter your new password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(JSON.stringify(data))
            this.userLogin.username = this.user.username;
            this.userLogin.password = data.currentPassword;
            this.userProvider.login(this.userLogin).then((result) => {
              this.user.password = data.newPassword;
              this.userProvider.updateUser(this.user).then((result) => {
                console.log(result);

              });
              alert.present();
            }, (err) => {

              let alert2 = this.alertCtrl.create({
                title: 'Invalid Password',
                message: 'The password you entered is incorrect',
                buttons: ['Dismiss']
              });
              alert2.present();
            });
            console.log('Saved clicked');
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
  }
}
