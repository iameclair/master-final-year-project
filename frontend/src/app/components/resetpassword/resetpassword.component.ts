import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  messageClass;
  message;
  form:FormGroup;
  previousUrl;
  processing = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) {
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      email :['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
    });
  }

  //disable the form after processing
  disableForm(){
    this.form.controls['email'].disable();
  }

  //enable form before processing
  enableForm() {
    this.form.controls['email'].enable();
  }

  //function to validate email
  validateEmail(controls){
    const regexp = new
    RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regexp.test(controls.value))return null;
    return {'validateEmail': true }
  }

  onSubmit(){
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value
    };
    //call the service for authentication
    this.authService.getEmail(user).subscribe(data =>{
      if(data.success){
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
    });

  }

  ngOnInit() {
  }

}
