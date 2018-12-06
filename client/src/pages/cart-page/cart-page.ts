import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { HomePage } from '../home/home';


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
  cost=0;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController , public navParams: NavParams, public cartProvider: CartProvider) {
    this.products = navParams.get('product');
    this.cart = navParams.get('cart');
  }


  ionViewDidLoad() {
    this.getCart();
  }

  totalCost(data){
    if(data.length>0){
    data.forEach(element => {
      this.cost = (+this.cost + +element.price*element.quantity)
    });
  }
  else{this.cost=0;}
  }

  getCart() {
    this.cartProvider.getCart()
      .subscribe(data => {
        this.cart = data;
        this.totalCost(data);
        console.log(this.cost);
        console.log(data)
      });
  }

  checkout(){
    this.cart.forEach(element => {
      this.cartProvider.deleteCart(element).subscribe((result) => {
        
      });
      
    });
    this.getCart();
    this.cost=0;
    let alert = this.alertCtrl.create({
      title: 'Success',
      message: 'Checkout Successful!',
      buttons: [
        {
          text: 'Dissmiss',
          handler: () => {
          }
        },
        {
          text: 'Continue shopping',
          handler: () => {
            this.navCtrl.push(HomePage)
          }
        }
      ]
    });
    alert.present();
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
              this.getCart();
              let alert = this.alertCtrl.create({
                title: 'Success',
                message: 'The product was successfully deleted',
                buttons: ['Dismiss']
              });
              alert.present();
              
            });

          }
        
        }
      ]
    });
    confirm.present();
  }

  
}
