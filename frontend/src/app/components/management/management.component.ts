import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {InfoService} from "../../services/info.service";
import {AppointmentService} from "../../services/appointment.service";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  managestaff = false;
  managepatient = false;
  viewfeedback = false;
  numberStats: any;
  appointmentStats: any;
  listOfPatients = [];
  listOfStaff = [];
  listOfUsers = [];
  mondayList = [];
  tuesdayList = [];
  wednesdayList = [];
  thursdayList = [];
  fridayList = [];
  saturdayList = [];
  sundayList = [];

  bookedMon: number = 0; bookedTue: number = 0; bookedWed: number = 0; bookedThu: number = 0;
  bookedFri: number = 0; bookedSat: number = 0; bookedSun: number = 0;
  availableMon: number = 0; availableTue: number = 0; availableWed: number = 0; availableThu: number = 0;
  availableFri: number = 0; availableSat: number = 0; availableSun: number = 0;
  isCanceledMon: number = 0; isCanceledTue: number = 0; isCanceledWed: number = 0; isCanceledThu: number = 0;
  isCanceledFri: number = 0; isCanceledSat: number = 0; isCanceledSun: number = 0;
  showOfMessageSent = [];
  listOfMessageSent = [];
  showOfMessageReceived = [];
  listOfMessageReceived = [];

  constructor(private authService: AuthService,
              private infoService: InfoService,
              private appointmentService: AppointmentService,
              private _contactService: ContactService) {
    this.infoService.getAllTheUsers().subscribe(data =>{
      data.users.forEach(user =>{
        if(user.permission === 'user'){
          this.listOfPatients.push(user);
        }else if(user.permission === 'staff'){
          this.listOfStaff.push(user);
        }
      });
      this.numberStats= {
        labels: ['Patients','Staff'],
        datasets: [
          {
            data: [this.listOfPatients.length, this.listOfStaff.length],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
            ]
          }]
      };
    });

    this.appointmentService.getAllAppointments().subscribe(results =>{
      console.log(results.appointments);
      results.appointments.forEach(appointment => {
        let day = new Date(appointment.date);
        if(day.getDay() === 0){
          this.sundayList.push(appointment);
          this.sundayList.forEach(app =>{
            if(app.status){
              //already booked
              this.bookedSun +=1;
            }else if(!app.status){
              this.availableSun +=1;
            }else if(app.canceled){
              this.isCanceledSun +=1;
            }
          })
        }else if(day.getDay() === 1){
          this.mondayList.push(appointment);
          this.mondayList.forEach(app =>{
            if(app.status){
              //already booked
              this.bookedMon +=1;
            }else if(!app.status){
              this.availableMon +=1;
            }else if(app.canceled){
              this.isCanceledMon +=1;
            }
          })
        }
         else if(day.getDay() === 2){
          this.tuesdayList.push(appointment);
          this.tuesdayList.forEach(app =>{
            if(app.status){
              //already booked
              this.bookedTue +=1;
            }else if(!app.status){
              this.availableTue +=1;
            }else if(app.canceled){
              this.isCanceledTue +=1;
            }
          })
        }
          else if(day.getDay() === 3){
           this.wednesdayList.push(appointment);
           this.wednesdayList.forEach(app =>{
              if(app.status){
                //already booked
                this.bookedWed +=1;
              }else if(!app.status){
                this.availableWed +=1;
              }else if(app.canceled){
                this.isCanceledWed +=1;
              }
          })
         }
          else if(day.getDay() === 4){
            this.thursdayList.push(appointment);
          this.thursdayList.forEach(app =>{
            if(app.status){
              //already booked
              this.bookedThu +=1;
            }else if(!app.status){
              this.availableThu +=1;
            }else if(app.canceled){
              this.isCanceledThu +=1;
            }
          })
          }
          else if(day.getDay() === 5){
            this.fridayList.push(appointment);
          this.fridayList.forEach(app =>{
            if(app.status){
              //already booked
              this.bookedFri +=1;
            }else if(!app.status){
              this.availableFri +=1;
            }else if(app.canceled){
              this.isCanceledFri +=1;
            }
          })
          }
          else if(day.getDay() === 6){
            this.saturdayList.push(appointment);
            this.saturdayList.forEach(app =>{
              if(app.status){
                //already booked
                this.bookedSat +=1;
              }else if(!app.status){
                this.availableSat +=1;
              }else if(app.canceled){
                this.isCanceledSat +=1;
              }
            })
          }
      });
      this.appointmentStats = {
        labels: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        datasets: [
          {
            label: 'Booked',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [this.bookedSun, this.bookedMon, this.bookedTue, this.bookedWed, this.bookedThu,
              this.bookedFri, this.bookedSat]
          },
          {
            label: 'Available',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: [this.availableSun, this.availableMon, this.availableTue, this.availableWed, this.availableThu,
              this.availableFri, this.availableSat]
          },
          {
            label: 'Canceled',
            backgroundColor: '#FFCE56',
            borderColor: '#FFCE56',
            data: [this.isCanceledSun, this.isCanceledMon, this.isCanceledTue, this.isCanceledWed,
              this.isCanceledThu, this.isCanceledFri, this.isCanceledSat]
          }
        ]
      }
    });

  }



  ngOnInit() {
    this._contactService.messageSent().subscribe((data) => {
      data.message.forEach(email =>{
        if(email.showOwner){
          this.showOfMessageSent.push(email);
        }
      });
      this.listOfMessageSent = data.message;
    });
    this._contactService.messageReceived().subscribe((data) => {
      data.message.forEach(email =>{
        if(email.showOwner){
          this.showOfMessageReceived.push(email);
        }
      });
      this.listOfMessageReceived = data.message;
    });
  }

  ngAfterViewInit() {

  }

}
