import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyProductsPage } from '../my-products/my-products';
import { AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userLogin = { username: '', password: '' };
  user:any={};
  userId = 0;
  newPassword: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public userProvider: UserProvider, public camera: Camera) {
    this.userId = navParams.get('userId');
    console.log(this.userId)
  }
  myProducts() {
    this.navCtrl.push(MyProductsPage);
  }

  ionViewDidLoad() {
    console.log("ssd")
    this.getUser();
  }

  getUser() {
    this.userProvider.getUser(this.userId)
      .then(data => {
        this.user = data;
        console.log(this.user);
      });
  }
  changePassword() {
    this.getUser();
    let alert = this.alertCtrl.create({
      title: 'Change password',
      inputs: [
        {
          name: 'currentPassword',
          placeholder: 'Enter your current password',
          type: 'password'

        },
        {
          name: 'newPassword',
          placeholder: 'Enter your new password',
          type: 'password'
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
            console.log(JSON.stringify(data))
            this.userLogin.username = this.user.username;
            this.userLogin.password = data.currentPassword;
            this.userProvider.login(this.userLogin).then((result) => {
              this.user.password = data.newPassword;
              this.userProvider.updateUser(this.user).then((result) => {
                console.log(result);
                let alert = this.alertCtrl.create({
                  title: 'Success',
                  message: 'Your password was successfully changed',
                  buttons: ['Dismiss']
                });
                alert.present();
              });
              // alert.present();
            }, (err) => {

              let alert = this.alertCtrl.create({
                title: 'Invalid Password',
                message: 'The password you entered is incorrect',
                buttons: ['Dismiss']
              });
              alert.present();
            });
            console.log('Saved clicked');
          }
        }
      ]
    });
    alert.present();
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
            let alert = this.alertCtrl.create({
              title: 'Confirm Account Deletion',
              inputs: [
                {
                  name: 'password',
                  placeholder: 'Enter your password',
                  type: 'password'
        
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
                  text: 'Confirm',
                  handler: data => {
                    console.log(JSON.stringify(data))
                    this.userLogin.username = this.user.username;
                    this.userLogin.password = data.password;
                    this.userProvider.login(this.userLogin).then((result) => {
                      this.userProvider.deleteUser(this.user).then((result) => {
                        let alert = this.alertCtrl.create({
                          title: 'Success',
                          message: 'The account was successfully deleted',
                          buttons: ['Dismiss']
                        });
                        alert.present();
                        this.navCtrl.push(LoginPage);
                      });
                    }, (err) => {
        
                      let alert = this.alertCtrl.create({
                        title: 'Invalid Password',
                        message: 'The password you entered is incorrect',
                        buttons: ['Dismiss']
                      });
                      alert.present();
                    });
                    console.log('Saved clicked');
                  }
                }
              ]
            });
            alert.present();
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  updateProfile() {
    console.log(this.user);
    this.userProvider.updateUser(this.user).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
    this.navCtrl.pop();
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


}
