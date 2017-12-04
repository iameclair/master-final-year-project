import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { InfoService } from '../../services/info.service';
import { Router } from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  messageClass;
  message;
  form:FormGroup;
  previousUrl;
  yourOtp;
  otp;
  constructor( private formBuilder: FormBuilder,
               private infoService: InfoService,
               private router: Router,
               private authGuard: AuthGuard)
  {

    this.infoService.getOtp().subscribe(data => {
      this.yourOtp = data.otp.otp;
      if(this.yourOtp === ''){
        this.messageClass = "alert alert-danger";
        this.message = 'You do not have admin permission';
      }
    });
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      otp : ['', Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ])]
    });
  }

//disable the form after processing
disableForm(){
  this.form.controls['otp'].disable();
}

//enable form before processing
enableForm() {
  this.form.controls['otp'].enable();
}

onSubmit() {

  this.otp= this.form.get('otp').value;

  //call the login service
  this.infoService.loginAsAdmin(this.otp).subscribe(data => {
    if (!data.success){
      this.messageClass = "alert alert-danger";
      this.message = data.message;
      this.enableForm();
    }else{
      this.disableForm();
      this.messageClass = "alert alert-success";
      this.message = data.message;
      console.log(data);
      setTimeout(() => {
        this.router.navigate(['/management']);
      }, 2000);
    }
  });
}


  ngOnInit() {
  }

}
