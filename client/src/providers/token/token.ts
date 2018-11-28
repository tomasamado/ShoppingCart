import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class TokenProvider {
  token: any;
  apiUrl = 'http://192.168.1.8:8100/';
  tokenHeader = {};

  constructor(public http: HttpClient, private storage: Storage) {
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

}
