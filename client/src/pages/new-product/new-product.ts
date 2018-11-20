import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProductProvider } from '../../providers/product/product';


@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {
  photolibrary: any;
  //product: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private photoLibrary: PhotoLibrary, private camera: Camera, public productProvider: ProductProvider) {
  }

  product: any = {title: "", description: "", price :"", quantity: ""};

  addPicture() {
    console.log('camera');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }
  addProduct(){
      this.productProvider.createProduct(this.product).then((result) => {
        console.log(result);
      }, (err) => {
        console.log(err);
      });
      this.navCtrl.pop();
  }
}
