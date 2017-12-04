import {Component, ViewChild, Output, EventEmitter} from "@angular/core";
import {DayPilot, DayPilotModalComponent} from "daypilot-pro-angular";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {CreateEventParams, DataService} from "../../services/dataservice.service";
import Modal = DayPilot.Angular.Modal;

@Component({
  selector: 'create-dialog',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  @ViewChild("modal") modal : Modal;
  @Output() close = new EventEmitter();

  form: FormGroup;
  dateFormat = "MM/dd/yyyy h:mm tt";

  constructor(private fb: FormBuilder, private ds: DataService) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      start: ["", this.dateTimeValidator(this.dateFormat)],
      end: ["", [Validators.required, this.dateTimeValidator(this.dateFormat)]]
    });
  }

  show(args: any) {
    /*args.name = "";
    this.form.setValue({
      start: args.start.toString(this.dateFormat),
      end: args.end.toString(this.dateFormat),
      name: ""
    });*/
    this.modal.show();
  }

  submit() {
    let data = this.form.getRawValue();

    let params: CreateEventParams = {
      start: DayPilot.Date.parse(data.start, this.dateFormat).toString(),
      end: DayPilot.Date.parse(data.end, this.dateFormat).toString(),
      text: data.name
    };

    this.ds.createEvent(params).subscribe(result => {
      params.id = result.id;
      this.modal.hide();
      this.close.emit(params);
    });
  }

  cancel() {
    this.modal.hide();
    this.close.emit();
  }

  closed(args) {
    this.close.emit(args);
  }

  dateTimeValidator(format: string) {
    return function(c:FormControl) {
      let valid = !!DayPilot.Date.parse(c.value, format);
      return valid ? null : {badDateTimeFormat: true};
    };
  }
}
