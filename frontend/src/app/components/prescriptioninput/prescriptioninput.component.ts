import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-prescriptioninput',
  templateUrl: './prescriptioninput.component.html',
  styleUrls: ['./prescriptioninput.component.css']
})
export class PrescriptioninputComponent implements OnInit {

  @Input('group')
  public form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
