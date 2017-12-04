import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.createform()
  }

  //create function to create a form
  createform(){
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        this.validateEmail
      ])],
      firstname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        this.validateNames
      ])],
      middlename: '',
      lastname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        this.validateNames
      ])],
      password1: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      password2: ['', Validators.required]
    }, {validator: this.matchingPasswords('password1', 'password2')});
  }

  //disable the form after processing
  disableForm(){
    this.form.controls['email'].disable();
    this.form.controls['firstname'].disable();
    this.form.controls['middlename'].disable();
    this.form.controls['lastname'].disable();
    this.form.controls['password1'].disable();
    this.form.controls['password2'].disable();
  }

  //enable form before processing
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['firstname'].enable();
    this.form.controls['middlename'].enable();
    this.form.controls['lastname'].enable();
    this.form.controls['password1'].enable();
    this.form.controls['password2'].enable();
  }

  //function to validate email
  validateEmail(controls){
    const regexp = new
    RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regexp.test(controls.value))return null;
    return {'validateEmail': true }
  }

  //validate names
  validateNames(controls){
    const regexp = new RegExp(/^[a-zA-Z ]+$/);
    if (regexp.test(controls.value)) return null;
    return {'validateNames': true }
  }
  //validate password
  validatePassword(controls){
    const regex = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,100}$/);
    if (regex.test(controls.value)) return null;
    return {'validatePassword': true }
  }

  //matching password
  matchingPasswords(password1, password2){
    return (group: FormGroup) => {
      if(group.controls[password1].value === group.controls[password2].value) return null;
      return {'matchingPasswords': true}
    }
  }
  //register function
  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
    //construct user object
    const user = {
      //get values from the form and send it to the backend
      email: this.form.get('email').value,
      first_name: this.form.get('firstname').value,
      middle_name: (this.form.get('middlename').value),
      last_name: (this.form.get('lastname').value),
      password: (this.form.get('password1').value),
    };

    //call auth service to register the details
    this.authService.registerUser(user).subscribe(data =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/account_activation']);
        }, 2000);
      }
    });
  }

  checkEmail(){
    const email = this.form.get('email').value;
    this.authService.checkEmail(email).subscribe((data) =>{
      if(!data.success){
        this.emailValid = false;
        this.emailMessage = data.message;
      }
    })
  }

  ngOnInit() {
  }

}
