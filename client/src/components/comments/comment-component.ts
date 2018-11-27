import { Component, Input } from '@angular/core';
import { NavController, ViewController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { ViewProductPage } from '../../pages/view-product/view-product';
import { CommentProvider } from '../../providers/comment/comment';
import { HomePage } from '../../pages/home/home';


@Component({
  selector: 'comment-component',
  templateUrl: 'comment-component.html'
})
export class CommentComponent {
  @Input() comments: any = {};
  text: string;
  delete: boolean = true;
  comment: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private viewCtrl: ViewController, public commentProvider: CommentProvider, public modalCtrl: ModalController, public navParams: NavParams) {
    console.log('Hello CommentsComponent Component');
    this.text = 'Hello World';
    this.comment = navParams.get('comment');
    // console.log(this.comments);
  }

  deleteComment() {
    const confirm = this.alertCtrl.create({
      title: 'Do you want to delete this comment?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes');
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No');
          }
        }
      ]
    });
    confirm.present();
  }
}


