import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class InfoService {

  //api url
  api = "http://localhost:8080/information";

  authToken;
 // options;

  constructor(private http: Http, private authService: AuthService) {}

  //getOtp
    getOtp(){
      this.authService.createAuthenticationHeaders();
      return this.http.get(this.api + '/otp', this.authService.options).map(res => res.json());
    }
    //login as admin
    loginAsAdmin(otp){
      this.authService.createAuthenticationHeaders();
      return this.http.get(this.api + '/loginasadmin/'+otp , this.authService.options).map(res => res.json());
    }

    //login as staff
    loginAsStaff(otp){
      this.authService.createAuthenticationHeaders();
      return this.http.get(this.api + '/loginasstaff/'+otp , this.authService.options).map(res => res.json());
    }

   //get user permissions
   getUserPermission(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api + '/permission', this.authService.options).map(res => res.json());
  }

   //get user  information
   getPatientProfile(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api + '/profile', this.authService.options).map(res => res.json());
  }

  //get patient medical profile
  getPatientMedicalProfile(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api + '/view_medical_history', this.authService.options).map(res => res.json());
  }

  getDoctorProfile(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api + '/profile', this.authService.options).map(res => res.json());
  }

  getAvatar(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api + '/avatar', this.authService.options).map(res => res.json());
  }
  getAllAvatars(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api + '/avatars', this.authService.options).map(res => res.json());
  }
  getUser(id){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api + '/get-user/'+id, this.authService.options).map(res => res.json());
  }

  getAllUsers(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api + '/get-user', this.authService.options).map(res => res.json());
  }
  getAllTheUsers(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api + '/get-users', this.authService.options).map(res => res.json());
  }
  updateContactInformation(contacts){
    this.authService.createAuthenticationHeaders();
    return this.http.put(this.api + '/update-contact-info', contacts, this.authService.options)
      .map(res => res.json());
  }
}
