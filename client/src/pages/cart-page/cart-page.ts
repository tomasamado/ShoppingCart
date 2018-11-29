import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart-page.html',
})

export class CartPage {
  products: any;
  cart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartProvider: CartProvider) {
    this.products = navParams.get('product');
  }

  ionViewDidLoad() {
  }

  getCart() {
    this.cartProvider.getCart()
      .subscribe(data => {
        this.cart = data;
      });
  }
}
