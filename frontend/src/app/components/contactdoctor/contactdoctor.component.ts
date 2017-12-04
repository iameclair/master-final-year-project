import {Component, NgZone, OnInit} from '@angular/core';
import { FormGroup, FormBuilder} from "@angular/forms"
import { SearchService } from "../../services/search.service"
import { Subject} from "rxjs/Subject"
import { AppointmentService } from "../../services/appointment.service"
import { ContactService } from "../../services/contact.service"
import { Router, ActivatedRoute } from "@angular/router"


@Component({
  selector: 'app-contactdoctor',
  templateUrl: './contactdoctor.component.html',
  styleUrls: ['./contactdoctor.component.css']
})
export class ContactdoctorComponent implements OnInit {

  showOfMessageSent = [];
  showOfMessageReceived = [];
  public form: FormGroup;
  public results : Object;
  public searchTerm$ = new Subject<string>();
  public searchKey;
  public listOfDoctors = [];
  public sendTo;
  public mailForm: FormGroup;
  public listOfMessageSent = [];
  public listOfMessageReceived = [];
  public message: any;

  constructor(private _formBuilder: FormBuilder,
              private _searchService: SearchService,
              private _contactService: ContactService,
              private _appointmentService: AppointmentService,
              private _router: Router,
              private _zone: NgZone) {
    this.createSearchForm();
    this.createEmailForm();

    this._searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results.results;
      });
  }

  createSearchForm(){
    this.form = this._formBuilder.group({
      search: [''],
    });
  }
  search(){
    this.searchKey = this.form.get('search').value;
    this._appointmentService.searchDoctorByName(this.searchKey).subscribe((data) =>{
      this.listOfDoctors = [];
      for(let i = 0; i < data.message.length; i++){
        if(data.message[i].permission === 'staff'){
          this.listOfDoctors.push(data.message[i]);
        }
      }
    });
  }

  clicked(email){
    this.sendTo = email;
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

  deleteMessage(messageId){

    this._contactService.getEmail(messageId).subscribe( (email)=>{
      console.log(email);
      if(email.success){
        let message = email.message;
        this._contactService.hideMessage(message).subscribe((data) =>{
          this.message = data.message;
          setTimeout(() => {
            this._zone.runOutsideAngular(() =>{
              location.reload();
            })
          }, 1000)
        });
      }
    });
  }



  ngOnInit() {
    this._appointmentService.displayDoctorsList().subscribe((data) =>{
      if(data.success){
        this.listOfDoctors = data.users;
      }
    });
    this._contactService.messageSent().subscribe((data) => {
          data.message.forEach(email =>{
            if(email.showOwner){
              this.showOfMessageSent.push(email);
            }
          });
          this.listOfMessageSent = data.message;
    });
    this._contactService.messageReceived().subscribe((data) => {
          data.message.forEach(email =>{
            if(email.showOwner){
              this.showOfMessageReceived.push(email);
            }
          });
          this.listOfMessageReceived = data.message;
    });
  }

}
