import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { AppointmentService } from "../../services/appointment.service"

@Component({
  selector: 'app-cancelappointment',
  templateUrl: './cancelappointment.component.html',
  styleUrls: ['./cancelappointment.component.css']
})
export class CancelappointmentComponent implements OnInit {

  public message; messageClass;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _appointmentService: AppointmentService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((data) => {
      let appointmentId = data['id'];
      this._appointmentService.getAppointment(appointmentId).subscribe((result) => {
        if(!result.success){
          console.log(result);
        }else{
          const appointment = result.appointment;
          this._appointmentService.cancelAppointment(appointment).subscribe((item) =>{
            this.messageClass = 'alert alert-success';
            this.message = item.message;
            setTimeout(() =>{
              this._router.navigate(['/appointment']);
            }, 2000)
          })
        }
      });
    });
  }

}
