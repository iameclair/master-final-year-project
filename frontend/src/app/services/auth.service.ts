import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from "angular2-jwt";

@Injectable()
export class AuthService {


  //api url
  api = "http://localhost:8080";
  authToken;
  user;
  permission;
  options;

  constructor(private http: Http) {}

  //activate account
  activateAccount(key) {
    return this.http
      .put(this.api + '/authentication/activate/'+ key, key)
      .map(res => res.json());
  }

  //use any time we need to attach headers for authorisation and access
  createAuthenticationHeaders(){
    //call load token
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  //function to register user
  registerUser(user) {
    return this.http.post(this.api + '/authentication/register', user).map(res => res.json());
  }

  checkEmail(email){
    return this.http.get(this.api+'/authentication/checkEmail/'+email).map(res => res.json());
  }

  //register user information
  registerUserInfo(info) {
    return this.http.post(this.api + '/authentication/info', info).map(res => res.json());
  }

  //login function
  login(user){
    return this.http.post(this.api + '/authentication/login', user).map(res => res.json());
  }

  //get email from user before reseting the password
  getEmail(user){
    return this.http.put(this.api + '/authentication/resetpassword', user).map(res => res.json());
  }

  //get the reset password token
  getResetPasswordToken(token){
    return this.http.get(this.api + '/authentication/resetpassword/'+ token).map(res => res.json());
  }

  //get save the new password
  saveNewPassword(email, user) {
    return this.http.put(this.api + '/authentication/savepassword/'+ email, user).map(res => res.json());
  }

  //logout function
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  //store user data That stores the user data

  storeUserData(token, permission, user){
    localStorage.setItem('token', token);
    localStorage.setItem('permission', permission);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    this.permission = permission;
  }

  //load token to load the token on page
  loadToken() {
    //const token =
    this.authToken = localStorage.getItem('token');
  }

  getPermission(){
    return localStorage.getItem('permission');
  }

  loggedIn(){
    return tokenNotExpired();
  }

  patient(){
    if(this.getPermission() === 'user') return true;
  }

  admin(){
    if(this.getPermission() === 'superuser') return true;
  }
  staff(){
    if(this.getPermission() === 'staff') return true;
  }

}
