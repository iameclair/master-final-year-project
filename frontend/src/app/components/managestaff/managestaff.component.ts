import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {ManageStaff} from "../../interfaces/managestaff.interface";
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
  selector: 'app-managestaff',
  templateUrl: './managestaff.component.html',
  styleUrls: ['./managestaff.component.css']
})
export class ManagestaffComponent implements OnInit {

  messageClass;
  message;
  addStaffForm:FormGroup;
  // formSearchByCategory: FormGroup;
  searchKey;
  addPatient;

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService,
              private router: Router,
              private authGuard: AuthGuard) {
    this.createAddStaffForm();
  }

  private initMedicalSpecialities() {
    return this.formBuilder.group({
      name:[''],
    })
  }

  createAddStaffForm(){
    this.addStaffForm = this.formBuilder.group({
      email: [''],
      medicalspecialities: this.formBuilder.array([
        this.initMedicalSpecialities()
      ]),
      permission: [''],
      position: ['']
    });
  }

  addMedicalSpeciality() {
    // add symptom to the list
    const control = <FormArray>this.addStaffForm.controls['medicalspecialities'];
    control.push(this.initMedicalSpecialities());
  }

  removeMedicalSpeciality(i: number) {
    // remove symptoms from the list
    const control = <FormArray>this.addStaffForm.controls['medicalspecialities'];
    control.removeAt(i);
  }

  onSubmitAddStaff(){
    const staff = {
      email : this.addStaffForm.get('email').value,
      medicalSpecialities: this.addStaffForm.get('medicalspecialities').value,
      permission: this.addStaffForm.get('permission').value,
      position: this.addStaffForm.get('position').value
    };

    console.log(staff);

    this.adminService.addStaff(staff).subscribe((data) => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        setTimeout(() =>{
          this.addStaffForm.reset();
          this.messageClass = 'alert alert-danger';
          //this.message = 'try again';
        }, 1500);
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() =>{
          this.addStaffForm.reset();
          this.messageClass = null;
          this.message = '';
          this.addPatient = false;
        }, 2000);
      }
    });
  }

  ngOnInit() {
  }

}
