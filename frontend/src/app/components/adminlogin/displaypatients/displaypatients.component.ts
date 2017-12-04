import { Component, OnInit } from '@angular/core';
import { AppointmentService} from "../../../services/appointment.service";
import { InfoService } from "../../../services/info.service"
import { FormGroup, FormBuilder} from "@angular/forms"

@Component({
  selector: 'app-displaypatients',
  templateUrl: './displaypatients.component.html',
  styleUrls: ['./displaypatients.component.css']
})
export class DisplaypatientsComponent implements OnInit {

  listOfPatients = [];
  searchKey=[];
  form:FormGroup;


  constructor(private appointmentService: AppointmentService,
              private _fb: FormBuilder,
              private _infoService: InfoService) {
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
      this.listOfPatients = [];
      for(let i = 0; i < data.message.length; i++){
        if(data.message[i].permission === 'user'){
          this.listOfPatients.push(data.message[i]);
        }
      }
    })
  }

  ngOnInit() {
    this._infoService.getAllUsers().subscribe(data => {
      console.log(data.list);

      if(data.success){
        this.listOfPatients = data.list;
        console.log(this.listOfPatients);
      }
    })

  }
}
