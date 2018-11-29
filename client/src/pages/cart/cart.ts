import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})

export class CartPage {
  products: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.products = navParams.get('product');
  }

  ionViewDidLoad() {
  }

}
