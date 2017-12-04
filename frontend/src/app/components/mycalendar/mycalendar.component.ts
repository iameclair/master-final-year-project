import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {DayPilot} from "daypilot-pro-angular"
import {DataService, MoveEventParams} from "../../services/dataservice.service"
import {CreateComponent} from "../create/create.component";
@Component({
  selector: 'mycalendar-component',
  templateUrl: './mycalendar.component.html',
  styleUrls: ['./mycalendar.component.css']
})
export class MycalendarComponent implements OnInit, AfterViewInit {

  @ViewChild("calendar") calendar: DayPilot.Angular.Calendar;
  @ViewChild("create") create: CreateComponent;
  events: any[];

  navigatorConfig = {
    selectMode: "week"
  };

  calendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "Week",
    eventDeleteHandling: "Update",
    onEventDeleted: args => {
     /* this.ds.deleteEvent(args.e.id()).subscribe(result => this.calendar.control.message("Deleted"));*/
    },
    onEventMoved: args => {
      let params : MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      /*this.ds.moveEvent(params).subscribe(result => this.calendar.control.message("Moved"));*/
    },
    onEventResized: args => {
      let params : MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      /*this.ds.moveEvent(params).subscribe(result => this.calendar.control.message("Resized"));*/
    },
    onTimeRangeSelected: args => {
      this.create.show('good');
    }
  };

  constructor(private ds: DataService) {

  }

  ngOnInit() {}
  ngAfterViewInit(): void {
    /*this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).
    subscribe(result => this.events = result);*/
  }
  viewChange() {
    /*this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).
    subscribe(result => this.events = result);*/

  }

  createClosed(args) {
    /*if (args.result) {
      this.events.push(args.result);
    }
    this.calendar.control.clearSelection();*/
  }
}
