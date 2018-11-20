import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ViewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-product',
  templateUrl: 'view-product.html',
})
export class ViewProductPage {
  product:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.product = navParams.get('product');
  }

  addProduct(){
      const toast = this.toastCtrl.create({
        message: 'Product added to cart',
        duration: 2000
      });
      toast.present();
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProductPage');
  }

}
