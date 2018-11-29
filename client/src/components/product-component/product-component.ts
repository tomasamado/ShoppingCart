import { Component, Input } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { ViewProductPage } from '../../pages/view-product/view-product';
import { ProductProvider } from '../../providers/product/product';

@Component({
  selector: 'product-component',
  templateUrl: 'product-component.html'
})
export class ProductComponent {
  @Input() products: any;
  @Input() user: any;
  @Input() filterData: any = [];

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public productProvider: ProductProvider) {
  }
  ngOnInit() {

  }
  viewProduct(product) {
    this.navCtrl.push(ViewProductPage, { product: product, user: this.user });
  }
}