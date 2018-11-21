import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class ProductProvider {
  token: any;
  apiUrl = 'http://192.168.1.15:8100/';
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
  deleteFromStorage() {
    return this.storage.clear();
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
  getOwnProducts() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'ownproduct', this.tokenHeader).subscribe(data => {
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
  updateProduct(data) {
    var updateUrl = this.apiUrl + 'product/' + data.id + '/'
    return new Promise(resolve => {
      this.http.put(updateUrl, data, this.tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  deleteProduct(data) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + 'product/' + data.id + '/', this.tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
