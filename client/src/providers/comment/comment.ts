import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the CommentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class CommentProvider {
  token: any;
  apiUrl = 'http://192.168.1.8:8100/';
  tokenHeader = {};

  constructor(public http: HttpClient, public storage:Storage) {
    console.log('Hello CommentProvider Provider');
  }
  setTokenHeader() {
    return this.getFromStorage().then((result) => {
      this.tokenHeader = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + result
        })
      };
      console.log (this.tokenHeader);
    });
  }
  getFromStorage() {
    return this.storage.get('JWT');
  }
  deleteFromStorage() {
    return this.storage.clear();
  }
  getComments() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'comment', this.tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
