import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { ViewProductPage } from '../../pages/view-product/view-product';

@Component({
  selector: 'product-component',
  templateUrl: 'product-component.html'
})
export class ProductComponent{
    constructor( public navCtrl: NavController, private viewCtrl: ViewController) {
      }

      viewProduct(){
        this.navCtrl.push(ViewProductPage);
      }
}