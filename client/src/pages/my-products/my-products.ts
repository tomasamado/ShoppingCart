import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { EditProductPage } from '../edit-product/edit-product';
import { ProductProvider } from '../../providers/product/product';


@IonicPage()
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html',
})
export class MyProductsPage {
  products:any;
  product:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductProvider, public alertCtrl: AlertController) {
  }
 
  editProduct(product){
    this.navCtrl.push(EditProductPage, {product: product});
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad MyProductsPage');
    this.getOwnProduct();
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

  getOwnProduct() {
    this.productProvider.getOwnProducts()
      .then(data => {
        this.products = data;
        console.log(this.products);
      });
  }
}
