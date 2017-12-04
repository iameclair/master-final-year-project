import { Component, OnInit } from '@angular/core';
import { StaffService } from "../../services/staff.service"
import {ActivatedRoute, Router} from "@angular/router"

@Component({
  selector: 'app-seepatient',
  templateUrl: './seepatient.component.html',
  styleUrls: ['./seepatient.component.css']
})
export class SeepatientComponent implements OnInit {

  public patientId;
  title; email; first_name; last_name; middle_name; dob;
  gender; height; weight; country_birth; nhsnumber; age;
  permission;
  active; today_date; today_month; today_year; today_day;

  //contact information
  phone_number; address_line1; address_line2; postcode; city;
  country_of_residence;

  //emergency info
  emergency_name; emergency_relationship; emergency_phone; emergency_address;
  emergency_name2; emergency_relationship2; emergency_phone2; emergency_address2;

  //medical history
  public listOfMedicalHistory = [];

  constructor(private staffService: StaffService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  calculate_age(date)
  {
    let dob = new Date(date);
    let birth_day = dob.getDate();
    let birth_month = dob.getMonth();
    let birth_year = dob.getFullYear();
    this.today_date = new Date();
    this.today_year = this.today_date.getFullYear();
    this.today_month = this.today_date.getMonth();
    this.today_day = this.today_date.getDate();
    this.age = this.today_year - birth_year;

    if ( this.today_month < (birth_month - 1))
    {
      this.age--;
    }
    if (((birth_month - 1) == this.today_month) && (this.today_day < birth_day))
    {
      this.age--;
    }
    return this.age;
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
    this.activatedRoute.params.subscribe(input =>{
      this.patientId = input['id'];
      this.staffService.getPatientDetails(this.patientId).subscribe(data =>{
        console.log('email '+data.patient);
        this.title = data.patient.title;
        this.email = data.patient.email;
        this.first_name = data.patient.owner.first_name;
        this.last_name = data.patient.owner.last_name;
        this.middle_name = data.patient.owner.middle_name;
        this.dob = this.renderDate(data.patient.dob);
        this.age = this.calculate_age(data.patient.dob);
        this.gender = data.patient.gender;
        this.height = data.patient.height;
        this.weight = data.patient.weight;
        this.country_birth = data.patient.country_of_birth;
        this.nhsnumber = data.patient.nhs_number;
        this.active = data.patient.owner.active;
        this.permission = data.patient.owner.permission;
        this.phone_number = data.patient.phone_number;
        this.address_line1 = data.patient.address_line1;
        this.address_line2 = data.patient.address_line2;
        this.postcode = data.patient.postcode;
        this.city = data.patient.city;
        this.country_of_residence = data.patient.country_of_residence;
        this.emergency_name = data.patient.emergency_name;
        this.emergency_relationship = data.patient.emergency_relationship;
        this.emergency_phone = data.patient.emergency_phone;
        this.emergency_address = data.patient.emergency_address;
        this.emergency_name2 = data.patient.emergency_name2;
        this.emergency_relationship2 = data.patient.emergency_relationship2;
        this.emergency_phone2 = data.patient.emergency_phone2;
        this.emergency_address2 = data.patient.emergency_address2;
      })
      this.staffService.getPatientMedicalHistory(this.patientId).subscribe(medHistory =>{
        console.log(medHistory.medicalhistory);
        this.listOfMedicalHistory = medHistory.medicalhistory;
      });
    })
  }

}
