import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { NewProductPage } from '../new-product/new-product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  createProduct(){
    this.navCtrl.push(NewProductPage);
  }

  viewProfile(){
    this.navCtrl.push(ProfilePage);
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
              this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }
}
