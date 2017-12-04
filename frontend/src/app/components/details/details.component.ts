import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.createform();
  }

  createform(){
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        this.validateEmail
      ])],
      title: [''],
      dob: [''],
      gender: [''],
      height: [''],
      weight: [''],
      country_birth: [''],
      ethnicity: [''],
      nhsnumber: [''],
      phonenumber: [''],
      addressline1: [''],
      addressline2: [''],
      postcode: ['', Validators.compose([
        this.isValidPostcode,
      ])],
      city: [''],
      country_residence: [''],
      emergency_name: [''],
      emergency_relationship: [''],
      emergency_number: [''],
      emergency_address: [''],
      emergency_name2: [''],
      emergency_relationship2: [''],
      emergency_number2: [''],
      emergency_address2: [''],

    });
  }

  onSubmitDetails(){


    const info  = {
      email: this.form.get('email').value,
      title: this.form.get('title').value,
      dob: this.form.get('dob').value,
      nhs_number: this.form.get('nhsnumber').value,
      gender: this.form.get('gender').value,
      height: this.form.get('height').value,
      weight: this.form.get('weight').value,
      country_of_birth: this.form.get('country_birth').value,
      ethnicity: this.form.get('ethnicity').value,
      phone_number: this.form.get('phonenumber').value,
      address_line1: this.form.get('addressline1').value,
      address_line2: this.form.get('addressline2').value,
      postcode: this.form.get('postcode').value,
      city: this.form.get('city').value,
      country_of_residence: this.form.get('country_residence').value,
      emergency_name: this.form.get('emergency_name').value,
      emergency_relationship: this.form.get('emergency_relationship').value,
      emergency_phone: this.form.get('emergency_number').value,
      emergency_address: this.form.get('emergency_address').value,
      emergency_name2: this.form.get('emergency_name2').value,
      emergency_relationship2: this.form.get('emergency_relationship2').value,
      emergency_phone2: this.form.get('emergency_number2').value,
      emergency_address2: this.form.get('emergency_address2').value,
    };
    //call service and pass info object as argument
    this.authService.registerUserInfo(info).subscribe((data) =>{
       if(data.success){
         this.messageClass = 'alert alert-success';
         this.message = data.message;
         setTimeout(() =>{
           this.router.navigate(['/login']);
         }, 2000)
       }else{
         this.messageClass = 'alert alert-danger';
         this.message = data.message;
       }
    });
  }

  //function to validate email
  validateEmail(controls){
    const regexp = new
    RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regexp.test(controls.value))return null;
    return {'validateEmail': true }
  }

  /* tests to see if string is in correct UK style postcode: AL1 1AB, BM1 5YZ etc. */
  isValidPostcode(controls) {
    const postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
    if(postcodeRegEx.test(controls.value)) return null;
    return {'isValidPostcode': true };
  }
  formatPostcode(controls) {
    if (this.isValidPostcode(controls.value)) {
      let postcodeRegEx = /(^[A-Z]{1,2}[0-9]{1,2})([0-9][A-Z]{2}$)/i;
      return controls.value.replace(postcodeRegEx,"$1 $2").toUpperCase();
    } else {
      return controls.value;
    }
  }

  ngOnInit() {

  }

}
