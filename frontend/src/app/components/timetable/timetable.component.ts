import {Component, OnInit, ViewChild, NgZone} from '@angular/core';
import {MyEvent} from "./event.component";
import {StaffService} from "../../services/staff.service";
import {InfoService} from "../../services/info.service";
import {Router} from "@angular/router";
import {AppointmentService} from "../../services/appointment.service";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  message; messageClass;
  events: Array<MyEvent> = [];
  headerConfig: any;
  event : MyEvent;
  dialogVisible: boolean = false;
  firstName; lastName; position;
  status;



  constructor(private staffService: StaffService,
              private infoService: InfoService,
              private router: Router,
              private appointmentService: AppointmentService,
              private zone: NgZone) {
    this.staffService.getListOfAppointments().subscribe(obj =>{
      obj.appointment.forEach(e =>{
        this.event = new MyEvent();
        this.event.id = e._id;
        this.event.date = e.date;
        this.event.doctor = e.doctor;
        this.event.status = e.status;
        this.event.patient = e.patient;
        this.event.reason = e.reason;
        this.events.push(this.event);
      });
    });
    console.log('List of events');
    console.log(this.events);
  }

  ngOnInit() {
    this.headerConfig = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    };
    this.infoService.getDoctorProfile().subscribe(data =>{
      this.firstName = data.info.owner.first_name;
      this.lastName = data.info.owner.last_name;
      this.position = data.info.owner.position;
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
    if(minutes === 0){
      return hours+':'+minutes+'0'+' '+label;
    }

    return hours+':'+minutes+' '+label;
  }

  handleDayClick(event){
    let today = Date.now();
    if(event.date < today){
      console.log('do nothing');
    }else{
      this.event = new MyEvent();
      this.event.date = event.date.format();
      this.dialogVisible = true;
    }
  }
  handleEventClick(e) {
    this.event.id = e.calEvent.id;
    this.event.date = e.calEvent.date;
    this.event.status = e.calEvent.status;
    this.dialogVisible = true;
  }

  saveEvent() {
    const appointment  = {
      date: this.event.date
    };
    this.appointmentService.createAppointment(appointment).subscribe((data) =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.dialogVisible = false;
        this.zone.runOutsideAngular(() => {
          location.reload();
        });
      }
    });

  }

  deleteEvent() {
    this.router.navigate(['/delete-timeslot/'+this.event.id]);
    this.dialogVisible = false;
  }

}
