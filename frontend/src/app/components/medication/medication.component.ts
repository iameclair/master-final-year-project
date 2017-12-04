import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css']
})
export class MedicationComponent implements OnInit {

  @Input('group')
  public form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
