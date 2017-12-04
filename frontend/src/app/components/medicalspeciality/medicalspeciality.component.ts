import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-medicalspeciality',
  templateUrl: './medicalspeciality.component.html',
  styleUrls: ['./medicalspeciality.component.css']
})
export class MedicalspecialityComponent implements OnInit {

  @Input('group')
  public form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
