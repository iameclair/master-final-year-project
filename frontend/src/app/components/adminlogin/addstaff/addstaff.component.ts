import { Component, OnInit } from '@angular/core';
import { AppointmentService } from "../../../services/appointment.service"
import { FormGroup, FormBuilder} from "@angular/forms"
@Component({
  selector: 'app-addstaff',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.css']
})
export class AddstaffComponent implements OnInit {

  listOfDoctors = [];
  searchKey=[];
  form:FormGroup;
  constructor(private appointmentService: AppointmentService,
              private _fb: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.form = this._fb.group({
      search: ['']
    });
  }

  search(){
    this.searchKey = this.form.get('search').value;
    this.appointmentService.searchDoctorByName(this.searchKey).subscribe(data =>{
      this.listOfDoctors = [];
      for(let i = 0; i < data.message.length; i++){
        if(data.message[i].permission === 'staff'){
          this.listOfDoctors.push(data.message[i]);
        }
      }
    })
  }

  ngOnInit() {
    this.appointmentService.displayDoctorsList().subscribe(data => {
      if(data.success){
        this.listOfDoctors = data.users;
      }
    })

  }

}
