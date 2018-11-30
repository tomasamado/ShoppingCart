import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart-page.html',
})

export class CartPage {
  products: any;
  cart: any;
  product: any;
  cartProduct: any = {};

  constructor(public navCtrl: NavController,public alertCtrl: AlertController , public navParams: NavParams, public cartProvider: CartProvider) {
    this.products = navParams.get('product');
    this.cart = navParams.get('cart');
  }


  ionViewDidLoad() {
    this.getCart()
  }

  getCart() {
    this.cartProvider.getCart()
      .subscribe(data => {
        this.cart = data;
        console.log(data)
      });
  }

  deleteCartProduct(product){
    const confirm = this.alertCtrl.create({
      title: 'Do you want to delete this product from your cart?',
      
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.cartProvider.deleteCart(product).subscribe((result) => {
              let alert = this.alertCtrl.create({
                title: 'Success',
                message: 'The product was successfully deleted',
                buttons: ['Dismiss']
              });
              alert.present();
            });
            this.navCtrl.pop();
            this.navCtrl.push(CartPage);
          }
        
        }
      ]
    });
    confirm.present();
  }

  
}
