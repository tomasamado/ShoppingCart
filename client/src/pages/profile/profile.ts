import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyProductsPage } from '../my-products/my-products';
import { AlertController } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private photoLibrary: PhotoLibrary, private camera: Camera) {
  }
  myProducts() {
    this.navCtrl.push(MyProductsPage);
  }

  changePassword() {
    const prompt = this.alertCtrl.create({
      title: 'Change password',
      message: "Enter your new password",
      inputs: [
        {
          name: 'password',
          placeholder: 'Enter password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  deleteUser() {
    const confirm = this.alertCtrl.create({
      title: 'Are you sure you want to delete this account?',
      message: 'This will permanently delete your account',
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
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  changePicture() {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
}
