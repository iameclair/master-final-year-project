import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import {DayPilot} from "daypilot-pro-angular";
import EventData = DayPilot.EventData;

@Injectable()
export class DataService {

  constructor() { }

  getEvents(start: DayPilot.Date, end: DayPilot.Date): Observable<EventData[]> {
    return //this.http.post("/api/backend_events.php", {start: start, end: end}).map((response:Response) => response.json());
  }

  createEvent(params: CreateEventParams): Observable<BackendResult> {
    return //this.http.post("/api/backend_create.php", params).map((response:Response) => response.json());
  }

  deleteEvent(id: string): Observable<BackendResult> {
    return //this.http.post("/api/backend_delete.php", {id: id}).map((response:Response) => response.json());
  }

  moveEvent(params: MoveEventParams): Observable<BackendResult> {
    return
    //this.http.post("/api/backend_move.php", params).map((response:Response) => response.json());
  }

}

export interface CreateEventParams {
  id?: string | number;
  start: string;
  end: string;
  text: string;
}

export interface MoveEventParams {
  id: string | number;
  newStart: string;
  newEnd: string;
}

export interface BackendResult {
  id: string | number;
  result: string;
  message: string;
}
