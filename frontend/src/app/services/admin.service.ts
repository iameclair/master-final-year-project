import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class AdminService {
  //api url
  api = "http://localhost:8080/admin";

  constructor(private http: Http, private authService: AuthService) { }

  //add staff
  addStaff(staff){
    this.authService.createAuthenticationHeaders();
    return this.http.post(this.api+'/add_staff', staff, this.authService.options)
           .map(res => res.json());
  }

  deleteUser(id){
    this.authService.createAuthenticationHeaders();
    return this.http.delete(this.api+'/delete_user/'+id, this.authService.options)
      .map(res => res.json());
  }

}
