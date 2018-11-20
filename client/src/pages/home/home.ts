import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { NewProductPage } from '../new-product/new-product';
import { MyProductsPage } from '../my-products/my-products';
import { UserProvider } from '../../providers/user/user';
import { ViewProductPage } from '../view-product/view-product';
import { ProductProvider } from '../../providers/product/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  user = {};
  userId = 0;
  products: any;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public userProvider: UserProvider, public productProvider: ProductProvider) {
    this.userId = navParams.get('userId');
  }

  ionViewDidEnter() {
    this.getUser();
    this.getProduct();
  }

  ionViewDidLoad() {
    this.productProvider.setTokenHeader();
  }

  viewProduct(product) {
    this.navCtrl.push(ViewProductPage,{product:product});
  }

  myProducts() {
    this.navCtrl.push(MyProductsPage);
  }

  createProduct() {
    this.navCtrl.push(NewProductPage);
  }

  viewProfile() {
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
  getProduct() {
    this.productProvider.getProducts()
      .then(data => {
        this.products = data;
        console.log(this.products);
      });
  }
}
