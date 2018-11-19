import { Component } from '@angular/core';
import { NavController, AlertController, NavParams} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { NewProductPage } from '../new-product/new-product';
import { MyProductsPage } from '../my-products/my-products';
import { UserProvider } from '../../providers/user/user';
import { ViewProductPage } from '../view-product/view-product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  user ={};
  userId = 0;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public userProvider: UserProvider) {
    this.userId = navParams.get('userId');
  }

  ionViewDidEnter(){
    this.getUser();
  }

  viewProduct(){
    this.navCtrl.push(ViewProductPage);
  }

  myProducts(){
    this.navCtrl.push(MyProductsPage);
  }

  createProduct(){
    this.navCtrl.push(NewProductPage);
  }

  viewProfile(){
    this.navCtrl.push(ProfilePage, { userId: this.userId });
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

  getUser() {
    this.userProvider.getUser(this.userId)
      .then(data => {
        this.user = data;
        console.log(this.user);
      });
  }
}
