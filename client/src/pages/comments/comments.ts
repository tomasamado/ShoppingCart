import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  comments: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.comments = navParams.get('comments');
  }

  ionViewDidLoad() {
    console.log(this.comments)
    console.log('ionViewDidLoad CommentsPage');
  }

}
