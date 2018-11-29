import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { CommentProvider } from '../../providers/comment/comment';
import { HomePage } from '../home/home';
import { CommentsPage } from '../comments/comments';
import { UserProvider } from '../../providers/user/user'
import { CartProvider } from '../../providers/cart/cart';


@IonicPage()
@Component({
  selector: 'page-view-product',
  templateUrl: 'view-product.html',
})
export class ViewProductPage {
  product: any;
  comments: any = {};
  user:any;
  cars:any=['BMW','Ferari','Audi','Bugati', 'a', 'aaaaa', 'a', 'a','a','a', 'a','a'];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController , public navParams: NavParams, public modalCtrl: ModalController, public userProvider: UserProvider , public toastCtrl: ToastController, public commentProvider: CommentProvider) {
  cartProduct:any ={};
  user: any;
    this.product = navParams.get('product');
    this.user = navParams.get('user');

  }

  ionViewDidEnter() {
    this.getComments(this.product.id);
    this.cartProduct = this.product;
  }



  addProduct() {

    const prompt = this.alertCtrl.create({
      title: 'Reply to this comment',
      inputs: [
        {
          type: 'number',
          name: 'quantity',
          placeholder: 'Quantity',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel');
          }
        },
        {
          text: 'Add',
          handler: data => {
            this.cartProduct.user_id = this.user.id;
            this.addToCart(this.cartProduct);
            console.log('Added');
            const toast = this.toastCtrl.create({
              message: 'Product added to cart',
              duration: 1600
            });
            toast.present();
          }
        }
      ]
    });
    prompt.present();
  }


  viewComments() {
    this.navCtrl.push(CommentsPage, { comments: this.comments, product: this.product, user: this.user });
  }

  addToCart(product) {
    this.cartProvider.createCart(product).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
    this.navCtrl.pop();
  }

  getComments(id) {
    this.commentProvider.getComments(id)
      .subscribe(data => {
        this.comments = data;
      });
  }

}
