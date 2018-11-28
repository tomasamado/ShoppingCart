import { Component, Input } from '@angular/core';
import { NavController, ViewController, ModalController, AlertController, NavParams, Content } from 'ionic-angular';
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
  @Input() product: any;
  text: string;
  delete: boolean = true;
  comment: any;
  edited: boolean = false;
  view: boolean = false;
  shownGroup = null;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private viewCtrl: ViewController, public commentProvider: CommentProvider, public modalCtrl: ModalController, public navParams: NavParams) {

  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

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
                message: 'The comment was successfully deleted',
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

  updateComment(comment) {
    const prompt = this.alertCtrl.create({
      title: 'Update comment',
      inputs: [
        {
          type: 'textarea',
          name: 'content',
          placeholder: 'Edit your comment',
          value: comment.content
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
          text: 'Save',
          handler: data => {
            comment.edited = true;
            comment.content = data.content;
            this.commentProvider.updateComment(comment).subscribe((result) => {
            }, (err) => {
              console.log(err);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  viewReplies() {
    this.view = true;
  }

}


