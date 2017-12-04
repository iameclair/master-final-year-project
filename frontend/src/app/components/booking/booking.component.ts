import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  messageClass;
  message;
  form:FormGroup;
  formSearch: FormGroup;
  searchKey; searchPreference;

  listOfAppointments: Array<Object>;
  userID;
  appointmentID;
  doctorName;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private appointmentService: AppointmentService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(data =>{
      this.userID = data['id'];
      this.appointmentService.getDoctorByID(this.userID).subscribe((data) => {
        this.doctorName = data.user.first_name;
      })
    });
    this.createFormSearch();
  }

  createFormSearch(){
    this.form = this.formBuilder.group({
      date: ['', Validators.required]
    });
  }

  onSubmitFindAvailable(){
     this.searchKey = (this.form.get('date').value);
     let date = new Date(this.searchKey);
     console.log('Date\n'+this.searchKey);
      this.appointmentService.checkAvailabilityDate(this.searchKey).subscribe((data) =>{
      this.listOfAppointments = [];
      this.listOfAppointments = data.appointment;
      console.log(this.listOfAppointments);
    });
  }

  @Input()
  get appointmentId(){
    return this.appointmentID;
  }

  set appointmentId(val){
    this.appointmentID = val;
  }

  bookAppointment(){
    this.route.params.subscribe(data =>{
      this.appointmentID = data['id'];
      this.appointmentService.getDoctorByID(this.userID).subscribe((data) => {
        this.doctorName = data.user.first_name;
      })
    });
    //this.appointmentService.bookAppointment()
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

      if(minutes === 0){
        return hours+':'+minutes+'0'+' '+label;
      }

    return hours+':'+minutes+' '+label;
  }

  renderStatus(status){
    if(status)return true;
    return false;
  }


  ngOnInit() {
    this.appointmentService.getListOfAppointments(this.userID).subscribe((data) => {
      this.listOfAppointments = data.appointment;
    });
  }

}
