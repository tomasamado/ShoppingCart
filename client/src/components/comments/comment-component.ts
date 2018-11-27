import { Component, Input } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { ViewProductPage } from '../../pages/view-product/view-product';
import { CommentProvider } from '../../providers/comment/comment';
import { HomePage } from '../../pages/home/home';


@Component({
  selector: 'comment-component',
  templateUrl: 'comment-component.html'
})
export class CommentComponent {
  @Input() comments:any = {};
  text: string;
  delete: boolean = true;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController,  public commentProvider: CommentProvider, public modalCtrl: ModalController) {
    console.log('Hello CommentsComponent Component');
    this.text = 'Hello World';
    // console.log(this.comments);
  }

  openModal() {

    let modal = this.modalCtrl.create(HomePage);
    modal.present();
  }

}
