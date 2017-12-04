import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  messageClass;
  message;
  form:FormGroup;
  appointmentID;
  appointmentDate;
  appointmentTime;
  appointment;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private appointmentService: AppointmentService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(data =>{
      this.appointmentID = data['id'];
      this.appointmentService.getbookAppointment(this.appointmentID).subscribe((data) => {
        if(!data.success){
          console.log(data.message);
        }else{
          console.log(data.appointment);
          this.appointment = data.appointment;
          this.appointmentDate = data.appointment.date;
          this.appointmentTime = data.appointment.date;
        }
      })
    });
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      reason: [''],
    });
  }

  onSubmit(){
    this.route.params.subscribe(data =>{
      this.appointmentID = data['id'];
      this.appointmentService.getbookAppointment(this.appointmentID).subscribe((data) => {
        if(!data.success){
          console.log(data.message);
        }else{
          //console.log(data.appointment);
          this.appointment = data.appointment;
          this.appointment.reason = this.form.get('reason').value;
          console.log(this.appointment);
          this.appointmentService.bookAppointment(this.appointment).subscribe((data) =>{
            console.log('Executes this '+ data);
            if(!data.success){
              this.messageClass = 'alert alert-danger';
              this.message = data.message;
            }else{
              this.messageClass = 'alert alert-success';
              this.message = data.message;
              setTimeout(() =>{
                this.router.navigate(['/appointment']);
              }, 2000)
            }
          });
        }
      })
    });
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
  }

}
