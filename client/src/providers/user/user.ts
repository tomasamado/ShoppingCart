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
export class UserProvider {
  token: any;
  apiUrl = 'http://192.168.1.8:8100/';
  tokenHeader = {};

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello UserProvider Provider');
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

  login(data) {
    return this.http.post(this.apiUrl + 'api/token/', JSON.stringify(data), httpOptions)
  }

  getUser(id) {
    return this.http.get(this.apiUrl + 'user/' + id)
  }

  addUser(data) {
    return this.http.post(this.apiUrl + 'user/', JSON.stringify(data), httpOptions)
  }
  
  updateUser(data) {
    var updateUrl = this.apiUrl + 'user/' + data.id + '/';
    return this.http.patch(updateUrl, data, this.tokenHeader)
  }

  deleteUser(data) {
    return this.http.delete(this.apiUrl + 'user/' + data.id + '/', this.tokenHeader)
  }
  












}
