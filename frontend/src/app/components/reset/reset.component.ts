import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  messageClass;
  message;
  form:FormGroup;
  token;
  theUser;
  theEmail;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {

    this.route.params.subscribe(data =>{
      this.token = data['token'];
    });
    console.log(this.token);
    this.authService.getResetPasswordToken(this.token).subscribe(data => {
      this.theUser = data.user;
      this.theEmail = data.user.email;
      console.log(this.theUser);
      console.log(this.theEmail);
    })

    this.createForm();



  }

  //form validation

  //disable the form after processing
  disableForm(){
    this.form.controls['password'].disable();
  }

  //enable form before processing
  enableForm() {
    this.form.controls['password'].enable();
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

  createForm(){
    this.form = this.formBuilder.group({
      password1: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      password2: ['', Validators.required]
    },{validator: this.matchingPasswords('password1', 'password2')});
  }



  onSubmit() {
    this.theUser = {
      password: (this.form.get('password1').value)
    };

    console.log(this.theUser.password);
    console.log(this.form.get('password1').value);
    // call service
     this.authService.saveNewPassword(this.theEmail, this.theUser).subscribe(data => {
      if(data.success){
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }else{
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
    });
  }



  ngOnInit() {

  }

}
