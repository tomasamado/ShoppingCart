import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditProductPage } from '../edit-product/edit-product';
import { ProductProvider } from '../../providers/product/product';

/**
 * Generated class for the MyProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html',
})
export class MyProductsPage {
  products:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductProvider) {
  }
 
  editProduct(product){
    this.navCtrl.push(EditProductPage, {product: product});
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad MyProductsPage');
    this.getOwnProduct();
  }

  getOwnProduct() {
    this.productProvider.getOwnProducts()
      .then(data => {
        this.products = data;
        console.log(this.products);
      });
  }
}
