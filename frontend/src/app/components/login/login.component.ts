import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  form:FormGroup;
  previousUrl;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private authGuard: AuthGuard) {
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
      password : ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])]
    });
  }

  //disable the form after processing
  disableForm(){
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }

  //enable form before processing
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
  }

  //function to validate email
  validateEmail(controls){
    const regexp = new
    RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regexp.test(controls.value))return null;
    return {'validateEmail': true }
  }
  //validate password
  validatePassword(controls){
    const regex = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,100}$/);
    if (regex.test(controls.value)) return null;
    return {'validatePassword': true }
  }

  onLoginSubmit() {

    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };

    //call the login service
    this.authService.login(user).subscribe(data => {
      if (!data.success){
        this.messageClass = "alert alert-danger";
        this.message = data.message;
      }else{
        console.log(data);
        this.messageClass = "alert alert-success";
        this.message = data.message;
        this.authService.storeUserData(data.token, data.user.permission, data.user);
        setTimeout(() => {
          if(this.previousUrl){
            this.router.navigate([this.previousUrl]);
          }else{
            if(data.user.permission === 'user'){
              this.router.navigate(['/gpassistant']);
            }else if(data.user.permission === 'superuser'){
              this.router.navigate(['/management']);
            }else if(data.user.permission === 'staff'){
              this.router.navigate(['/staff']);
            }
          }
        }, 2000);
      }
    });
  }

  redirectTo(){
    //redirect to provide email page
    this.router.navigate(['/provideemail']);
  }
  ngOnInit() {
    if(this.authGuard.redirectUrl){
      this.messageClass = 'alert alert-danger';
      this.message = 'You must be logged in to access that page';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

}
