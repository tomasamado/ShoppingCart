import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { MyProductsPage } from '../my-products/my-products';

/**
 * Generated class for the EditProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  product:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public productProvider : ProductProvider, public alertCtrl: AlertController) {
    this.product = navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
    console.log(this.product);
  }
  updateProduct() {
    console.log(this.product);
    this.productProvider.updateProduct(this.product).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
    this.navCtrl.pop();
  }
  deleteProduct(){
    const confirm = this.alertCtrl.create({
      title: 'Are you sure you want to delete this product?',
      message: 'This will permanently delete your product',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.productProvider.deleteProduct(this.product).then((result) => {
              let alert = this.alertCtrl.create({
                title: 'Success',
                message: 'The product was successfully deleted',
                buttons: ['Dismiss']
              });
              alert.present();
              this.navCtrl.push(MyProductsPage);
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
