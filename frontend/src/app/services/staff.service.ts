import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class StaffService {

  api = "http://localhost:8080/staff";

  constructor(private http: Http
              , private authService: AuthService)
  {

  }

  getListOfAppointments(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/appointment_list', this.authService.options)
      .map(res => res.json());
  }

  viewMyAppointment(){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/view_my_appointment',this.authService.options)
      .map(res => res.json());
  }

  getPatientDetails(id){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/view-patient-detail/'+id,this.authService.options)
      .map(res => res.json());
  }

  getPatientMedicalHistory(id){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/patient-medical-history/'+id,this.authService.options)
      .map(res => res.json());
  }

  deleteAppointment(id){
    this.authService.createAuthenticationHeaders();
    return this.http.delete(this.api+'/delete_appointment/'+id,this.authService.options)
      .map(res => res.json());
  }

  getTimeSlot(id){
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.api+'/get-time-slot/'+id,this.authService.options)
      .map(res => res.json());
  }

  updateTimeSlot(timeslot){
    this.authService.createAuthenticationHeaders();
    return this.http.put(this.api+'/update-timeslot', timeslot,this.authService.options)
      .map(res => res.json());
  }

  createMedicalHistory(medicalReport){
    this.authService.createAuthenticationHeaders();
    return this.http.post(this.api+'/medical_report',medicalReport, this.authService.options)
      .map(res => res.json());
  }
}
