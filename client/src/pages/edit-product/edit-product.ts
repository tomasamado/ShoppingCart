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
  user: any;
  comments: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductProvider, public alertCtrl: AlertController, public commentProvider: CommentProvider) {
    this.product = navParams.get('product');
    this.user= navParams.get('user');
  }
  myInput: string;

  ionViewDidEnter() {
    this.getComments(this.product.id);
  }

  ionViewDidLoad() {
  }
  getComments(id) {
    this.commentProvider.getComments(id)
      .subscribe(data => {
        this.comments = data;
      });
  }
  updateProduct() {
    this.productProvider.updateProduct(this.product).subscribe((result) => {
    }, (err) => {
      console.log(err);
    });
    this.navCtrl.pop();
  }
  viewComments() {
    this.navCtrl.push(CommentsPage,{comments: this.comments, product: this.product, user: this.user});
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
