import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { CommentProvider } from '../../providers/comment/comment';
import { HomePage } from '../home/home';
import { CommentsPage } from '../comments/comments';
import {UserProvider} from '../../providers/user/user'


@IonicPage()
@Component({
  selector: 'page-view-product',
  templateUrl: 'view-product.html',
})
export class ViewProductPage {
  product: any;
  comments: any = {};
  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public userProvider: UserProvider , public toastCtrl: ToastController, public commentProvider: CommentProvider) {
    this.product = navParams.get('product');
    this.user= navParams.get('user');

  }

  ionViewDidEnter() {
    this.getComments(this.product.id);
  }

  addProduct(){
      const toast = this.toastCtrl.create({
        message: 'Product added to cart',
        duration: 2000
      });
      toast.present();
    }
  
  viewComments(){
    this.navCtrl.push(CommentsPage,{comments: this.comments, product: this.product, user: this.user});
  }
    
  getComments(id){
    this.commentProvider.getComments(id)
      .subscribe(data => {
        this.comments = data;
        console.log(this.comments);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProductPage');
  }

}
