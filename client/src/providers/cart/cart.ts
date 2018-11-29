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
export class CartProvider {

  constructor(public http: HttpClient, private tokenProvider: TokenProvider) {
    console.log('Hello CartProvider Provider');
  }
  getCart() {
    return this.http.get(this.tokenProvider.apiUrl + 'cart', this.tokenProvider.tokenHeader)
  }
  
  getOwnCart() {
    return this.http.get(this.tokenProvider.apiUrl + 'cart', this.tokenProvider.tokenHeader)
  }

  createCart(data) {
    return this.http.post(this.tokenProvider.apiUrl + 'cart/', JSON.stringify(data), this.tokenProvider.tokenHeader)
  }

  updateCart(data) {
    var updateUrl = this.tokenProvider.apiUrl + 'cart/' + data.id + '/'
    return this.http.put(updateUrl, data, this.tokenProvider.tokenHeader)
  }

  deleteCart(data) {
    return this.http.delete(this.tokenProvider.apiUrl + 'cart/' + data.id + '/', this.tokenProvider.tokenHeader)
  }
}
