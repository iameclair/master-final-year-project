import {Component, NgZone, OnInit} from '@angular/core';
import { InfoService } from '../../services/info.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-patientinfo',
  templateUrl: './patientinfo.component.html',
  styleUrls: ['./patientinfo.component.css']
})
export class PatientinfoComponent implements OnInit {

  messageClass;
  message;
  form:FormGroup;

  title; email; first_name; last_name; middle_name; dob;
  gender; height; weight; country_birth; nhsnumber; age;
  permission;
  active; today_date; today_month; today_year; today_day;

  //contact information
  phone_number; address_line1; address_line2; postcode; city;
  country_of_residence;

  //emergency info
  emergency_name; emergency_relationship; emergency_phone; emergency_address;
  emergency_name2; emergency_relationship2; emergency_phone2; emergency_address2;

  //avatar
  public avatar: String;
  //medical history
  public listOfMedicalHistory : Array<Object>;
  public display: boolean = false;

  constructor(private infoService: InfoService,
              private authService: AuthService,
              private _formBuilder: FormBuilder,
              private zone: NgZone) {
    this.createForm();
  }

  createForm(){
    this.form = this._formBuilder.group({
      phone: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  calculate_age(date)
  {
    let dob = new Date(date);
    let birth_day = dob.getDate();
    let birth_month = dob.getMonth();
    let birth_year = dob.getFullYear();
    this.today_date = new Date();
    this.today_year = this.today_date.getFullYear();
    this.today_month = this.today_date.getMonth();
    this.today_day = this.today_date.getDate();
    this.age = this.today_year - birth_year;

    if ( this.today_month < (birth_month - 1))
    {
      this.age--;
    }
    if (((birth_month - 1) == this.today_month) && (this.today_day < birth_day))
    {
      this.age--;
    }
    return this.age;
  }

  renderDate(date){
    let day, month, year;
    let dob = new Date(date);

    day = dob.getDate();
    month = dob.getMonth()+1;
    year = dob.getFullYear();

    switch(month){
      case 1: month = 'January'; break;
      case 2: month = 'February'; break;
      case 3: month = 'March'; break;
      case 4: month = 'April'; break;
      case 5: month = 'May'; break;
      case 6: month = 'June'; break;
      case 7: month = 'July'; break;
      case 8: month = 'August'; break;
      case 9: month = 'September'; break;
      case 10: month = 'October'; break;
      case 11: month = 'November'; break;
      case 12: month = 'December'; break;
    }

    return ""+day+"-"+month+"-"+year+"";
  }

  renderTime(time){
    let date = new Date(time);
    let hours = date.getHours()-1;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let label;
    if(hours <12 || hours === 24){
      label = 'AM';
    }else
    if(hours >= 12 && hours <=23){
      label = 'PM';
    }

    return hours+':'+minutes+' '+label;
  }

  showDialog(){
    this.display = true;
  }


  updateContacts(){
    const contacts = {
      phone_number: this.form.get('phone').value,
      address_line1:this.form.get('address1').value,
      address_line2:this.form.get('address2').value,
      postcode:this.form.get('postcode').value,
      city:this.form.get('city').value,
      country_of_residence:this.form.get('country').value
    };
    this.infoService.updateContactInformation(contacts).subscribe(data =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() =>{
          this.zone.runOutsideAngular(() =>{
            location.reload();
          })
        }, 2000)
      }
    });
  }

  ngOnInit() {
   this.infoService.getPatientProfile().subscribe(data =>{
      this.title = data.info.title;
      this.email = data.info.email;
      this.first_name = data.info.owner.first_name;
      this.last_name = data.info.owner.last_name;
      this.middle_name = data.info.owner.middle_name;
      this.dob = this.renderDate(data.info.dob);
      this.age = this.calculate_age(data.info.dob);
      this.gender = data.info.gender;
      this.height = data.info.height;
      this.weight = data.info.weight;
      this.country_birth = data.info.country_of_birth;
      this.nhsnumber = data.info.nhs_number;
      this.active = data.info.owner.active;
      this.permission = data.info.owner.permission;
      this.phone_number = data.info.phone_number;
      this.address_line1 = data.info.address_line1;
      this.address_line2 = data.info.address_line2;
      this.postcode = data.info.postcode;
      this.city = data.info.city;
      this.country_of_residence = data.info.country_of_residence;
      this.emergency_name = data.info.emergency_name;
      this.emergency_relationship = data.info.emergency_relationship;
      this.emergency_phone = data.info.emergency_phone;
      this.emergency_address = data.info.emergency_address;
     this.emergency_name2 = data.info.emergency_name2;
     this.emergency_relationship2 = data.info.emergency_relationship2;
     this.emergency_phone2 = data.info.emergency_phone2;
     this.emergency_address2 = data.info.emergency_address2;

    });

    this.infoService.getPatientMedicalProfile().subscribe((data) =>{
      this.listOfMedicalHistory = data.medicalHistory;
    });

    //get profile image
    this.infoService.getAvatar().subscribe((data) =>{
      this.avatar = data.image.avatar;
    })
  }

}
