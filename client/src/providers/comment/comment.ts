import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TokenProvider } from '../token/token';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class CommentProvider {

  constructor(public http: HttpClient, public storage: Storage, private tokenProvider: TokenProvider) {
    console.log('Hello CommentProvider Provider');
  }
  getComments(id) {
    return this.http.get(this.tokenProvider.apiUrl + 'comment/?product_id=' + id, this.tokenProvider.tokenHeader)
  }
  createComment(data) {
    return this.http.post(this.tokenProvider.apiUrl + 'comment/', JSON.stringify(data), this.tokenProvider.tokenHeader)
  }
  deleteComment(data) {
    return this.http.delete(this.tokenProvider.apiUrl + 'commentId/' + data.id + '/', this.tokenProvider.tokenHeader)
  }
  updateComment(data) {
    var updateUrl = this.tokenProvider.apiUrl + 'commentId/' + data.id + '/'
    return this.http.put(updateUrl, data, this.tokenProvider.tokenHeader)
  }
}
