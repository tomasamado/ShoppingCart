import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class ProductProvider {
  token: any;
  apiUrl = 'http://192.168.1.9:8100/';
  tokenHeader = {};

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello ProductProvider Provider');
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
  getProducts() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'product', this.tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  createProduct(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'product/', JSON.stringify(data), this.tokenHeader)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
