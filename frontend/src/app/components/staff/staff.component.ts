import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { InfoService } from '../../services/info.service';
import { Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import { MedicalHistory } from '../../interfaces/medicalhistory.interface';
import { Router } from '@angular/router';
import {AppointmentService} from "app/services/appointment.service";
import {forEach} from "@angular/router/src/utils/collection";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  listOfMessageReceived = [];
  listOfMessageSent = [];
  public mailForm: FormGroup;
  public sendTo;
  public form: FormGroup;
  listOfAppointments = [];
  listOfMyAppointments = [];
  category = [];
  firstName; lastName; position;
  message;
  messageClass;
  avatar;
  constructor(private staffService: StaffService,
              private infoService: InfoService,
              private _formBuilder: FormBuilder,
              private router: Router,
              private appoitmentService: AppointmentService,
              private _contactService: ContactService,) {
    this.createForm();
    this.createEmailForm();
  }

  createEmailForm(){
    this.mailForm = this._formBuilder.group({
      to:[''],
      subject:[''],
      content:['']
    })
  }

  sendEmail(){
    const email = {
      to: this.mailForm.get('to').value,
      subject: this.mailForm.get('subject').value,
      content: this.mailForm.get('content').value,
    };

    this._contactService.sendEmail(email).subscribe((data) => {
      console.log(data);
    });

  }

  createForm(){
    this.form = this._formBuilder.group({
      date: ['',Validators.required],
    });
  }

  onSubmit(){
    const appointment  = {
      date: this.form.get('date').value,
    };
    this.appoitmentService.createAppointment(appointment).subscribe((data) =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message+' create another time slot or close the dialog';
        console.log('Appointment \n'+ data.appointment);
      }
    });
  }

  renderDate(date){
    let day, month, year;
    let dob = new Date(date);

    day = dob.getDate();
    month = dob.getMonth()+1;
    year = dob.getFullYear();

    return ""+day+"/"+month+"/"+year+"";
  }

  renderTime(time){
    let date = new Date(time);
    let hours = date.getHours();
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
    let userdata
    this.staffService.getListOfAppointments().subscribe((data) => {
      this.listOfAppointments = data.appointment;
    });

    this.staffService.viewMyAppointment().subscribe((data) => {
       this.listOfMyAppointments = data.appointment;
       data.appointment.forEach(patient =>{
          console.log(patient.patient);
       })
    });

    this.infoService.getDoctorProfile().subscribe(data =>{
       this.category= data.info.owner.medicalSpecialities;
       this.firstName = data.info.owner.first_name;
       this.lastName = data.info.owner.last_name;
       this.position = data.info.owner.position;
    });
    this._contactService.messageSent().subscribe((data) => {
      console.log(data);
      this.listOfMessageSent = data.message;
    });
    this._contactService.messageReceived().subscribe((data) => {
      console.log(data);
      this.listOfMessageReceived = data.message;
    });

    //get profile image
    this.infoService.getAvatar().subscribe((data) =>{
      this.avatar = data.image.avatar;
      console.log(data);
    })

  }

}
