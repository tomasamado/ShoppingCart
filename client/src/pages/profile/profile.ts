import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyProductsPage } from '../my-products/my-products';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user ={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.user= navParams.get('user');
    console.log(this.user)
  }
  myProducts(){
    this.navCtrl.push(MyProductsPage);
  }

  changePassword() {
    const prompt = this.alertCtrl.create({
      title: 'Change password',
      message: "Enter your new password",
      inputs: [
        {
          name: 'password',
          placeholder: 'Enter password'
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
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
  }
}
