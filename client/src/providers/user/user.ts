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
export class UserProvider {

  constructor(public http: HttpClient, private storage: Storage, private tokenProvider: TokenProvider) {
    console.log('Hello UserProvider Provider');
  }

  login(data) {
    return this.http.post(this.tokenProvider.apiUrl + 'api/token/', JSON.stringify(data), httpOptions)
  }

  getUser(id) {
    return this.http.get(this.tokenProvider.apiUrl + 'user/' + id)
  }

  addUser(data) {
    return this.http.post(this.tokenProvider.apiUrl + 'user/', JSON.stringify(data), httpOptions)
  }
  
  updateUser(data) {
    var updateUrl = this.tokenProvider.apiUrl + 'user/' + data.id + '/';
    return this.http.patch(updateUrl, data, this.tokenProvider.tokenHeader)
  }

  deleteUser(data) {
    return this.http.delete(this.tokenProvider.apiUrl + 'user/' + data.id + '/', this.tokenProvider.tokenHeader)
  }
  












}
