import {Component, NgZone, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { InfoService } from "../../services/info.service"
import { ContactService } from "../../services/contact.service"
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public userId; message; messageClass; to;
  public mailForm: FormGroup;
  public processing: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private infoService: InfoService,
              private contactService: ContactService,
              private _formBuilder: FormBuilder,
              private zone: NgZone) {
    this.activatedRoute.params.subscribe(output => {
      this.userId = output['id'];
      console.log(this.userId);
      this.infoService.getUser(this.userId).subscribe(result => {
        this.to = result.user.email;
      })
    });
    this.createEmailForm();
  }

  createEmailForm(){
    this.mailForm = this._formBuilder.group({
      to:['', Validators.required],
      subject:['', Validators.required],
      content:['', Validators.required]
    })
  }

  sendEmail(){
    const email = {
      to: this.mailForm.get('to').value,
      subject: this.mailForm.get('subject').value,
      content: this.mailForm.get('content').value,
    };

   this.contactService.sendEmail(email).subscribe((data) => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.processing = true;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.infoService.getDoctorProfile().subscribe(data =>{
            let permission = data.info.owner._id;
            if(permission === 'staff'){
              this.router.navigate(['/staff']);
            }
          });
        }, 2000);
      }
    });

  }

  ngOnInit() {
  }

}
