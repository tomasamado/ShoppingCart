import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { TokenProvider } from '../token/token';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class ProductProvider {

  constructor(public http: HttpClient, private storage: Storage, private tokenProvider: TokenProvider) {
    console.log('Hello ProductProvider Provider');
  }

  getProducts() {
    return this.http.get(this.tokenProvider.apiUrl + 'product', this.tokenProvider.tokenHeader)
  }
  
  getOwnProducts() {
    return this.http.get(this.tokenProvider.apiUrl + 'ownproduct', this.tokenProvider.tokenHeader)
  }

  createProduct(data) {
    return this.http.post(this.tokenProvider.apiUrl + 'product/', JSON.stringify(data), this.tokenProvider.tokenHeader)
  }

  updateProduct(data) {
    var updateUrl = this.tokenProvider.apiUrl + 'product/' + data.id + '/'
    return this.http.put(updateUrl, data, this.tokenProvider.tokenHeader)
  }

  deleteProduct(data) {
    return this.http.delete(this.tokenProvider.apiUrl + 'product/' + data.id + '/', this.tokenProvider.tokenHeader)
  }
}
