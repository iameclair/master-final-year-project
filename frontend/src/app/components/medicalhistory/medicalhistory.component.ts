import { Component, OnInit, /*ViewEncapsulation*/ } from '@angular/core';
import { StaffService } from '../../services/staff.service';
//import { InfoService } from '../../services/info.service';
import { /*Validators,*/ FormGroup, FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { MedicalHistory } from '../../interfaces/medicalhistory.interface';

@Component({
  selector: 'app-medicalhistory',
  templateUrl: './medicalhistory.component.html',
  styleUrls: ['./medicalhistory.component.css']
})
export class MedicalhistoryComponent implements OnInit {

  public form: FormGroup;
  public  appointmentId;
  public message;
  public messageClass;
 // listOfAppointments: Array<Object>;
  //listOfMyAppointments: Array<Object>;
  //category;
 // firstName; lastName; position;

  constructor(private staffService: StaffService,
             // private infoService: InfoService,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
  }

  onSubmitForm(){
    this._activatedRoute.params.subscribe((data) =>{
      this.appointmentId = data['appId'];
      const medicalReport = {
        date: this.form.get('date').value,
        reason: this.form.get('reason').value,
        symptoms: this.form.get('symptoms').value,
        medications: this.form.get('medications').value,
        prescriptions: this.form.get('prescriptions').value,
        patient: data['userId']
      };
      //delete appointment
      this.staffService.deleteAppointment(this.appointmentId).subscribe((data) =>{
        if(!data.success){
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
        }else{
          this.messageClass = 'alert alert-success';
          this.message = data.message;
        }
      });
      //create patient medical report
      this.staffService.createMedicalHistory(medicalReport).subscribe((data) => {
        if(!data.success){
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
        }else{
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          setTimeout(()=>{
            this._router.navigate(['/staff']);
          },2000);
        }
      })
    });
  }


  initSymptoms(){
    return this._formBuilder.group({
      name:[''],
      description:[''],
    })
  }

  addSymptom() {
    // add symptom to the list
    const control = <FormArray>this.form.controls['symptoms'];
    control.push(this.initSymptoms());
  }

  removeSymptom(i: number) {
    // remove symptoms from the list
    const control = <FormArray>this.form.controls['symptoms'];
    control.removeAt(i);
  }

  initPrescriptions(){
    return this._formBuilder.group({
      name: [''],
      instruction: [''],
      repeating: [''],
    })
  }

  addPrescription(){
    const control = <FormArray>this.form.controls['prescriptions'];
    control.push(this.initPrescriptions());
  }

  removePrescription(i: number) {
    // remove prescription from the list
    const control = <FormArray>this.form.controls['prescriptions'];
    control.removeAt(i);
  }

  initMedications(){
    return this._formBuilder.group({
      name: [''],
    })
  }

  addMedication(){
    const control = <FormArray>this.form.controls['medications'];
    control.push(this.initMedications());
  }

  removeMedication(i: number) {
    // remove symptoms from the list
    const control = <FormArray>this.form.controls['medications'];
    control.removeAt(i);
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
     /* email:[''],*/
      date:[''],
      reason:[''],
      symptoms: this._formBuilder.array([
        this.initSymptoms(),
      ]) ,
      prescriptions: this._formBuilder.array([
        this.initPrescriptions(),
      ]),
      medications: this._formBuilder.array([
        this.initMedications(),
      ])
    })
  }

}
