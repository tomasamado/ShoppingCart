import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommentProvider } from '../../providers/comment/comment';



@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  comments: any = {};
  productId : any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public commentProvider: CommentProvider) {
    this.comments = navParams.get('comments');
    this.productId = navParams.get('productId');
  }
  comment: any = {content:"", product_id:0}

  ionViewDidLoad() {
    console.log(this.comments)
    console.log(this.comment.content);
    this.comment.product_id = this.productId
  }
  addComment(){
    this.commentProvider.createComment(this.comment).subscribe((result) => {
      console.log(result);
      this.getComments(this.productId);
      this.comment.content='';
    }, (err) => {
      console.log(err);
    });
}
// getreplies(){
//   for(let comment of this.comments) {
    
//     ;
//   }
// }
getComments(id){
  this.commentProvider.getComments(id)
    .subscribe(data => {
      this.comments = data;
      console.log(this.comments);
    });
}

}
