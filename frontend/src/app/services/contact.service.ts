import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import { AuthService } from "./auth.service"
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  api = "http://localhost:8080/contact";
  constructor(private _http: Http,
              private _authService: AuthService) { }

  sendEmail(email){
    this._authService.createAuthenticationHeaders();
    return this._http.post(this.api+'/send-message', email, this._authService.options)
      .map(res => res.json());
  }

  messageSent(){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.api+'/message-sent', this._authService.options)
      .map(res => res.json());
  }

  messageReceived(){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.api+'/message-received', this._authService.options)
      .map(res => res.json());
  }

  getEmail(id){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.api+'/get-message/'+id, this._authService.options)
      .map(res => res.json());
  }

  hideMessage(message){
    this._authService.createAuthenticationHeaders();
    return this._http.put(this.api+'/hide-message',message, this._authService.options)
      .map(res => res.json());
  }

}
