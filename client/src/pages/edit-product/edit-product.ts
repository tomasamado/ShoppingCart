import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { CommentsPage } from '../comments/comments';
import { CommentProvider } from '../../providers/comment/comment';


@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  product: any;

  comments: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductProvider, public alertCtrl: AlertController, public commentProvider: CommentProvider) {
    this.product = navParams.get('product');
  }
  myInput: string;

  ionViewDidEnter() {
    this.getComments(this.product.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
    console.log(this.product);
  }
  getComments(id) {
    this.commentProvider.getComments(id)
      .subscribe(data => {
        this.comments = data;
        console.log(this.comments);
      });
  }
  updateProduct() {
    console.log(this.product);
    this.productProvider.updateProduct(this.product).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
    this.navCtrl.pop();
  }
  viewComments() {
    this.navCtrl.push(CommentsPage, { comments: this.comments });
  }

  deleteProduct() {
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
            this.productProvider.deleteProduct(this.product).subscribe((result) => {
              let alert = this.alertCtrl.create({
                title: 'Success',
                message: 'The product was successfully deleted',
                buttons: ['Dismiss']
              });
              alert.present();
              this.navCtrl.pop();
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
