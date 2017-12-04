import { Component, OnInit } from '@angular/core';
import { StaffService } from "../../services/staff.service"
import { Router, ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-deletetimeslot',
  templateUrl: './deletetimeslot.component.html',
  styleUrls: ['./deletetimeslot.component.css']
})
export class DeletetimeslotComponent implements OnInit {

  public message; messageClass;

  constructor(private _router:Router,
              private _staffService: StaffService,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(data =>{
      let timeSlotId = data['id'];
      this._staffService.deleteAppointment(timeSlotId).subscribe(result => {
        if(!result.success){
          this.messageClass = 'alert alert-danger';
          this.message = result.message;
        }else{
          this.messageClass = 'alert alert-success';
          this.message = result.message;
          setTimeout(() =>{
            this._router.navigate(['/staff']);
          }, 2000);
        }
      })
    })
  }

}
