import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrescriptionService} from "../../services/prescription.service";

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  add = false;
  form:FormGroup;
  reminderForm: FormGroup
  message; messageClass;
  listOfPrescriptions = [];
  disabled: boolean = true;
  newReminder;
  constructor(private _fb:FormBuilder,
              private _prescriptionService: PrescriptionService,
              private zone: NgZone) {
    this.createForm();
    this.setReminderForm();
  }



  createForm(){
   this.form = this._fb.group({
     drName:['', Validators.required],
     pName:['', Validators.required],
     pEmail:['', Validators.required],
     pPhone:[''],
     check:[''],
     prescName:['', Validators.required],
     refillDate: ['', Validators.required],
     reminderStart:['', Validators.required]
   });
  }

  onSubmitSetReminder(){
    const prescription = {
      doctor: this.form.get('drName').value,
      patient: this.form.get('pName').value,
      email: this.form.get('pEmail').value,
      phone: this.form.get('pPhone').value,
      sendSms: this.form.get('check').value,
      pres_name:  this.form.get('prescName').value,
      refill: this.form.get('refillDate').value,
      startReminder: this.form.get('reminderStart').value,
    };

    this._prescriptionService.createPrescription(prescription).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() =>{
          this.zone.runOutsideAngular(() =>{
            location.reload();
          })
        }, 2000)
      }
    });

  }

  setReminderForm(){
    this.reminderForm = this._fb.group({
      reminderStart:['', Validators.required]
    })
  }
  toggleInput(){
    this.disabled = false;
  }

  resetReminder(id){
    this._prescriptionService.getPrescription(id).subscribe(data =>{
      console.log(data);
      if(data.success){
        const presc = data.prescription;
        console.log('presc\n'+ presc);
        presc.startReminder = this.newReminder;
        this._prescriptionService.resetReminder(presc).subscribe(result =>{
          if(!result.success){
            this.message=result.message;
            this.messageClass = 'alert alert-danger';
          }else{
            this.message=result.message;
            this.messageClass = 'alert alert-success';
            setTimeout(() =>{
              this.zone.runOutsideAngular(() =>{
                location.reload();
              })
            }, 2000)
          }
        })
      }
    })
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

  ngOnInit() {
    this._prescriptionService.getPrescriptions().subscribe(data =>{
      this.listOfPrescriptions = data.prescriptions;
    });
  }

}
