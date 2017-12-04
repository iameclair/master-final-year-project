import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {AuthService} from "./auth.service";

@Injectable()
export class PrescriptionService {

  api = "http://localhost:8080/prescription";

  constructor(private http: Http, private authService: AuthService) { }


  createPrescription(prescription){
    this.authService.createAuthenticationHeaders();
    return this.http.post(this.api + '/create', prescription,this.authService.options)
      .map(res => res.json());
  }

  //get prescription
  getPrescriptions(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api + '/prescriptions',this.authService.options)
      .map(res => res.json());
  }

  getPrescription(id){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api + '/prescriptions/'+id,this.authService.options)
      .map(res => res.json());
  }

  resetReminder(presc){
    this.authService.createAuthenticationHeaders();
    return this.http.put(this.api + '/prescriptions',presc,this.authService.options)
      .map(res => res.json());
  }


}
