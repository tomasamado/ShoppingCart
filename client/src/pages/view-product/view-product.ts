import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { CommentProvider } from '../../providers/comment/comment';
import { CommentsPage } from '../comments/comments';
import { UserProvider } from '../../providers/user/user'
import { CartProvider } from '../../providers/cart/cart';
import { ProductComponent } from '../../components/product-component/product-component';
import { ProductProvider } from '../../providers/product/product';


@IonicPage()
@Component({
  selector: 'page-view-product',
  templateUrl: 'view-product.html',
})
export class ViewProductPage {
  product: any;
  comments: any = {};
  user: any;
  cartProduct: any = {};
  cart: any = {};
  existsInCart: boolean;
  vCart: any = {};
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public productProvider: ProductProvider, public navParams: NavParams, public modalCtrl: ModalController, public userProvider: UserProvider, public toastCtrl: ToastController, public commentProvider: CommentProvider, public cartProvider: CartProvider) {
    this.product = navParams.get('product');
    this.user = navParams.get('user');

  }

  ionViewDidEnter() {
    this.getComments(this.product.id);
    console.log(this.product.quantity);
    console.log("product initialy is "+ this.product.id)
    this.cartProduct = JSON.parse(JSON.stringify(this.product));

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
            this.cartProduct
            this.existsInCart = false;
            if (data.quantity<=this.product.quantity){
            this.cartProvider.getCart().subscribe(datas => {
                this.vCart = datas
                this.cartProduct.product_id = this.product.id;
                this.vCart.forEach(element => {
                  if (element.product_id == this.product.id){
                  this.existsInCart = true;
                  this.cartProduct.id = element.id;
                  console.log(element)
                  console.log("quintiturs before the sumers " + this.cartProduct.quantity)
                  this.cartProduct.quantity = (+element.quantity + +data.quantity);
                  console.log("ye biu")
                  }
                });
                console.log(this.existsInCart);

                console.log("the carts produict cuqntity is now " + this.cartProduct.quantity)

                this.cartProduct.user_id = this.user.id;

                this.product.quantity = (this.product.quantity - data.quantity);

                console.log("this produs quaintut is now " + this.product.quantity);
                console.log("THIS PR" + this.product.id)

                if (this.existsInCart){

                  this.cartProvider.updateCart(this.cartProduct).subscribe((result) => {
                    this.productProvider.updateProduct(this.product).subscribe((result) => {
                      console.log(result);
                    });
                    console.log(result);
                  });
                }else{
                  this.cartProduct.quantity = data.quantity;
                  this.cartProvider.createCart(this.cartProduct).subscribe((result) => {
                    this.productProvider.updateProduct(this.product).subscribe((result) => {});

                    console.log(result);
                  });
                } 
            });
            console.log('Added');
            const toast = this.toastCtrl.create({
              message: 'Product added to cart',
              duration: 1600
            });
            toast.present();
            }else{
              let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'There arent that many products available',
                buttons: ['Dismiss']
              });
        
              alert.present();
            }
          }
        }
      ]
    });
    prompt.present();
  }


  viewComments() {
    this.navCtrl.push(CommentsPage, { comments: this.comments, product: this.product, user: this.user });
  }

  getComments(id) {
    this.commentProvider.getComments(id)
      .subscribe(data => {
        this.comments = data;
      });
  }
  
}
