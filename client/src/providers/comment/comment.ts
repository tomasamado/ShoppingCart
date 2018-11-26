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
  getComments() {
    return this.http.get(this.tokenProvider.apiUrl + 'comment', this.tokenProvider.tokenHeader)
  }
}
