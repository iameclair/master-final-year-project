import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StaffService } from '../../services/staff.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-makeappointment',
  templateUrl: './makeappointment.component.html',
  styleUrls: ['./makeappointment.component.css']
})
export class MakeappointmentComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  currentTimeSlot;


  constructor(private formBuilder: FormBuilder,
              private staffService: StaffService,
              private router: Router,
              private _activetedRoute: ActivatedRoute) {
    this.createForm();
    this._activetedRoute.params.subscribe(data =>{
      let timeSlotId = data['id'];
      this.staffService.getTimeSlot(timeSlotId).subscribe(result =>{
        this.currentTimeSlot = result.timeslot.date;
      })
    })
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

  createForm(){
    this.form = this.formBuilder.group({
      date: [''],
    });
  }
  onSubmit(){
    this._activetedRoute.params.subscribe(data =>{
      let timeSlotId = data['id'];
      this.staffService.getTimeSlot(timeSlotId).subscribe(result =>{
        if(!result.success){
          this.messageClass = 'alert alert-danger';
          this.message = result.message;
        }else{
          this.currentTimeSlot = result.timeslot;
          this.currentTimeSlot.date = this.form.get('date').value;
          this.staffService.updateTimeSlot(this.currentTimeSlot).subscribe( output =>{
            if(!output.success){
              this.messageClass = 'alert alert-danger';
              this.message = output.message;
            }else{
              this.messageClass = 'alert alert-success';
              this.message = output.message;
              setTimeout(() =>{
                this.router.navigate(['/staff']);
              }, 2000)
            }
          })
        }
      })
    });
  }

  ngOnInit() {
  }

}
