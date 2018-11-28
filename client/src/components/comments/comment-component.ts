import { Component, Input } from '@angular/core';
import { NavController, ViewController, ModalController, AlertController } from 'ionic-angular';
import { ViewProductPage } from '../../pages/view-product/view-product';
import { CommentProvider } from '../../providers/comment/comment';
import { HomePage } from '../../pages/home/home';


@Component({
  selector: 'comment-component',
  templateUrl: 'comment-component.html'
})
export class CommentComponent {
  @Input() comments: any = {};
  @Input() user: any;
  @Input() product:any;
  text: string;
  delete: boolean = true;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private viewCtrl: ViewController, public commentProvider: CommentProvider, public modalCtrl: ModalController) {
    console.log('Hello CommentsComponent Component');
    this.text = 'Hello World';
    // console.log(this.comments);
  }
  deleteComment(comment) {
    const confirm = this.alertCtrl.create({
      title: 'Do you want to delete this comment?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.commentProvider.deleteComment(comment).subscribe((result) => {
              let alert = this.alertCtrl.create({
                title: 'Success',
                message: 'The product was successfully deleted',
                buttons: ['Dismiss']
              });
              alert.present();
            });
            this.navCtrl.pop();
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


