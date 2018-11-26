import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { NewProductPage } from '../new-product/new-product';
import { MyProductsPage } from '../my-products/my-products';
import { UserProvider } from '../../providers/user/user';
import { ViewProductPage } from '../view-product/view-product';
import { ProductProvider } from '../../providers/product/product';
import { CommentProvider } from '../../providers/comment/comment';
import { CartPage } from '../cart/cart';
import { TokenProvider } from '../../providers/token/token';
import { JwtHelper } from 'angular2-jwt';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  user = {};
  userId = 0;
  filterData: any = [];
  products: any;
  jwtHelper: JwtHelper = new JwtHelper();
  token:any;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public userProvider: UserProvider, public productProvider: ProductProvider, public commentProvider: CommentProvider, public tokenProvider: TokenProvider) {
  }

  ionViewDidEnter() {
    this.getData();
  }

  ionViewDidLoad() {
    this.tokenProvider.setTokenHeader();
  }

  viewProduct(product) {
    this.navCtrl.push(ViewProductPage, { product: product });
  }

  myProducts() {
    this.navCtrl.push(MyProductsPage);
  }

  createProduct() {
    this.navCtrl.push(NewProductPage);
  }

  viewProfile() {
    this.navCtrl.push(ProfilePage, { userId: this.userId });
  }
  
  getData(){
    this.tokenProvider.getFromStorage().then((result) => {
      this.token = result;
      var decoded = this.jwtHelper.decodeToken(result);
      this.userId = decoded.user_id;
      this.getUser();
      this.getProducts();
      console.log (this.userId);
    });
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.tokenProvider.deleteFromStorage().then((result) => {
              this.navCtrl.setRoot(LoginPage);
              this.navCtrl.pop;
            });
          }
        }
      ]
    });
    confirm.present();
  }

  getUser() {
    this.userProvider.getUser(this.userId)
      .subscribe(data => {
        this.user = data;
        console.log(this.user);
      });
  }
  getProducts() {
    this.productProvider.getProducts()
      .subscribe(data => {
        this.products = data;
        this.filterData = data;
        console.log(this.products);
      });
  }
  goToCart() {
    this.navCtrl.push(CartPage);
  }

  filterItems(ev: any) {
    let val = ev.target.value;
    this.filterData = this.products.filter(function (item) {
      return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }
}
