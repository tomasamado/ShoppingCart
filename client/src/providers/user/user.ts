import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenProvider } from '../token/token';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient, private tokenProvider: TokenProvider) {
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

  // addPicture(data) {
  //   return this.http.post(this.tokenProvider.apiUrl + 'profilepic/', JSON.stringify(data), this.tokenProvider.tokenHeader)
  // }
}
