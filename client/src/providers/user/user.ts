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
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'api/token/', JSON.stringify(data), httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUser(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'user/' + id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'user/', JSON.stringify(data), httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  updateUser(data) {
    var updateUrl = this.apiUrl + 'user/' + data.id + '/'
    return new Promise(resolve => {
      this.http.patch(updateUrl, data, this.tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  // updatePassword(data) {
  //   var updateUrl = this.apiUrl + 'user/' + data.id + '/'
  //   return new Promise(resolve => {
  //     this.http.put(updateUrl, data, this.tokenHeader).subscribe(data => {
  //       resolve(data);
  //     }, err => {
  //       console.log(err);
  //     });
  //   });
  // }

  deleteUser(data) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + 'user/' + data.id + '/', this.tokenHeader).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  












}
