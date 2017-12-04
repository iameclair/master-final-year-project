import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {InfoService} from "../../services/info.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  messageClass;
  message;
  form:FormGroup;
  formSearchByCategory: FormGroup;
  searchKey; searchPreference;
  listofDoctors = [];
  listofMyAppointments = [];
  avatar;
  avatarids = [] ;

  constructor(private formBuilder: FormBuilder,
              private appointmentService: AppointmentService,
              private infoService:InfoService,
              private router: Router,
              private authGuard: AuthGuard) {
    this.createFormSearch();
  }

  createFormSearch(){
    this.form = this.formBuilder.group({
      searchPreference: [''],
      search: ['']
    });
  }

  onSubmitSearch(){
    this.searchPreference = this.form.get('searchPreference').value;
    this.searchKey = this.form.get('search').value;
    if(this.searchPreference === 'name'){
      this.appointmentService.searchDoctorByName(this.searchKey).subscribe((data) =>{
          this.listofDoctors = [];
          for(let i = 0; i < data.message.length; i++){
            if(data.message[i].permission === 'staff'){
             this.listofDoctors.push(data.message[i]);
             }
          }
       });
    }else if(this.searchPreference === 'category'){
      this.appointmentService.searchDoctorByCategory(this.searchKey).subscribe((data) =>{
        this.listofDoctors = [];
        for(let i = 0; i < data.user.length; i++) {
          if(data.user[i].permission === 'staff'){
            this.listofDoctors.push(data.user[i]);
          }
        }
      });
    }
  }

  renderDate(date){
    let day, month, year;
    let dob = new Date(date);

    day = dob.getDate();
    month = dob.getMonth()+1;
    year = dob.getFullYear();

    switch(month){
      case 1: month = 'January'; break;
      case 2: month = 'February'; break;
      case 3: month = 'March'; break;
      case 4: month = 'April'; break;
      case 5: month = 'May'; break;
      case 6: month = 'June'; break;
      case 7: month = 'July'; break;
      case 8: month = 'August'; break;
      case 9: month = 'September'; break;
      case 10: month = 'October'; break;
      case 11: month = 'November'; break;
      case 12: month = 'December'; break;
    }

    return ""+day+"-"+month+"-"+year+"";
  }

  renderTime(time){
    let date = new Date(time);
    let hours = date.getHours()-1;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let label;
    if(hours <12 || hours === 24){
      label = 'AM';
    }else
    if(hours >= 12 && hours <=23){
      label = 'PM';
    }

    return hours+':'+minutes+' '+label;
  }


  ngOnInit() {
    this.appointmentService.displayDoctorsList().subscribe((data) =>{
      if(data.success){
       this.listofDoctors = data.users;
      }
    });

    this.appointmentService.viewMyAppointment().subscribe((data) =>{
      console.log(data);
      if(data.success){
        this.listofMyAppointments = data.appointment;
      }
    })

  }

}
