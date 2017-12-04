import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import {tokenNotExpired} from "angular2-jwt";

@Injectable()
export class AppointmentService {

  //api url
  api = "http://localhost:8080";
  authToken;
 // user;
 // permission;

  constructor(private http: Http, private authService: AuthService) {}

  //create appointment
  createAppointment(appointment){
    this.authService.createAuthenticationHeaders();
    return this.http.post(this.api+'/staff/create_appointment', appointment, this.authService.options)
      .map(res => res.json());
  }

  //search for doctor by name
  searchDoctorByName(name){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/appointment/search_doctor/'+name, this.authService.options)
      .map(res => res.json());
  }

  //search for doctor by name
  searchDoctorByCategory(category){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/appointment/search_category/'+category, this.authService.options)
      .map(res => res.json());
  }

  //display list of all the doctor
  displayDoctorsList(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/admin/get_staff', this.authService.options)
      .map(res => res.json());
  }

  //get doctor by id
  getDoctorByID(id){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/appointment/get_doctor/'+id, this.authService.options)
      .map(res => res.json());
  }

  getListOfAppointments(id){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/appointment/appointment_list/'+id, this.authService.options)
      .map(res => res.json());
  }

  //checavailability
  checkAvailabilityDate(date){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/appointment/check_availability_date/'+date,this.authService.options)
      .map(res => res.json());
  }

  viewMyAppointment(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/appointment/my-appointment',this.authService.options)
      .map(res => res.json());
  }

  //book available appointments
  getbookAppointment(id){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/appointment/book_appointment/'+id, this.authService.options)
      .map(res => res.json());
  }
  bookAppointment(appointment){
    this.authService.createAuthenticationHeaders();
    return this.http.post(this.api+'/appointment/book_appointment', appointment, this.authService.options)
      .map(res => res.json());
  }

  getAppointment(id){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/appointment/cancel_appointment/'+id, this.authService.options)
      .map(res => res.json());
  }

  getAllAppointments(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/appointment/appointments', this.authService.options)
      .map(res => res.json());
  }

  cancelAppointment(appointment){
    this.authService.createAuthenticationHeaders();
    return this.http.put(this.api+'/appointment/cancel_appointment', appointment, this.authService.options)
      .map(res => res.json());
  }

}
