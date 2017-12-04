import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import {
  ButtonModule, CalendarModule, CheckboxModule, CodeHighlighterModule, InputTextModule,
  ScheduleModule, TabViewModule, DialogModule, FileUploadModule, GrowlModule, OrderListModule, DataGridModule,
  PanelModule, DataListModule, OverlayPanelModule, ChartModule, InputSwitchModule
} from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PatientinfoComponent } from './components/patientinfo/patientinfo.component';
import { HomenavbarComponent } from './components/homenavbar/homenavbar.component';
import { MainComponent } from './components/main/main.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { ManagementComponent } from './components/management/management.component';
import { DetailsComponent } from './components/details/details.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ResetComponent } from './components/reset/reset.component';
import { ActivationviewComponent } from './components/activationview/activationview.component';
import { ActivateaccountComponent } from './components/activateaccount/activateaccount.component';
import { StaffComponent } from './components/staff/staff.component';
import { ManagestaffComponent } from './components/managestaff/managestaff.component';
import { ManagepatientComponent } from './components/managepatient/managepatient.component';
import { ContactdoctorComponent } from './components/contactdoctor/contactdoctor.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { StaffloginComponent } from './components/stafflogin/stafflogin.component';
import { ManagpatientComponent } from './components/managpatient/managpatient.component';
import { AddstaffComponent } from './components/adminlogin/addstaff/addstaff.component';
import { DisplaypatientsComponent } from './components/adminlogin/displaypatients/displaypatients.component';
import { AdminviewComponent } from './components/adminview/adminview.component';
import { StaffviewComponent } from './components/staffview/staffview.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { MakeappointmentComponent } from './components/makeappointment/makeappointment.component';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notauth.guard';
import { AdminPermissionGuard } from "./guards/adminpermission.guard";
import { StaffPermissionGuard } from "./guards/staffpermission.guard";
import { UserPermissionGuard } from "./guards/userpermission.guard";

import { AuthService } from './services/auth.service';
import { InfoService } from './services/info.service';
import { AdminDirective } from './directives/admin.permission.directive';
import { AppointmentService } from "./services/appointment.service";

import { StaffDirective } from './directives/staff.permission.directive';
import { UserDirective } from './directives/user.permission.directive';
import {AdminService} from "./services/admin.service";
import { BookingComponent } from './components/booking/booking.component';
import { MyappointmentsComponent } from './components/myappointments/myappointments.component';
import {StaffService} from "./services/staff.service";
import { BookComponent } from './components/book/book.component';
import { SymptomComponent } from './components/symptom/symptom.component';
import { MedicationComponent } from './components/medication/medication.component';
import { PrescriptioninputComponent } from './components/prescriptioninput/prescriptioninput.component';
import { MedicalhistoryComponent } from './components/medicalhistory/medicalhistory.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
import {SearchService} from "./services/search.service";
import {ContactService} from "./services/contact.service";
import { DeletemessageComponent } from './components/deletemessage/deletemessage.component';
import { CancelappointmentComponent } from './components/cancelappointment/cancelappointment.component';
import { UpdatetimeslotComponent } from './components/updatetimeslot/updatetimeslot.component';
import { DeletetimeslotComponent } from './components/deletetimeslot/deletetimeslot.component';
import { CancelpatientComponent } from './components/cancelpatient/cancelpatient.component';
import { SeepatientComponent } from './components/seepatient/seepatient.component';
import { MedicalspecialityComponent } from './components/medicalspeciality/medicalspeciality.component';
import { DeletestaffComponent } from './components/deletestaff/deletestaff.component';
import { ContactComponent } from './components/contact/contact.component';
import {DayPilotModule} from "daypilot-pro-angular";
import {MycalendarComponent} from "./components/mycalendar/mycalendar.component";
import {DataService} from "./services/dataservice.service";
import {CreateComponent} from "./components/create/create.component";
import { TimetableComponent } from './components/timetable/timetable.component';
import {NavflowComponent} from "./components/appointment/navflow/navflow.component";
import {PrescriptionService} from "./services/prescription.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    PatientinfoComponent,
    HomenavbarComponent,
    MainComponent,
    AppointmentComponent,
    PrescriptionComponent,
    ManagementComponent,
    DetailsComponent,
    ResetpasswordComponent,
    ResetComponent,
    ActivationviewComponent,
    ActivateaccountComponent,
    StaffComponent,
    ManagestaffComponent,
    ManagepatientComponent,
    ContactdoctorComponent,
    AdminloginComponent,
    StaffloginComponent,
    ManagpatientComponent,
    AddstaffComponent,
    DisplaypatientsComponent,
    AdminviewComponent,
    StaffviewComponent,
    AdminnavbarComponent,
    AdminDirective,
    StaffDirective,
    UserDirective,
    MakeappointmentComponent,
    BookingComponent,
    MyappointmentsComponent,
    BookComponent,
    SymptomComponent,
    MedicationComponent,
    PrescriptioninputComponent,
    MedicalhistoryComponent,
    FooterComponent,
    FileSelectDirective,
    UploadfileComponent,
    DeletemessageComponent,
    CancelappointmentComponent,
    UpdatetimeslotComponent,
    DeletetimeslotComponent,
    CancelpatientComponent,
    SeepatientComponent,
    MedicalspecialityComponent,
    DeletestaffComponent,
    ContactComponent,
    MycalendarComponent,
    CreateComponent,
    TimetableComponent,
    NavflowComponent
    //CalendarComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule,
    FormsModule,
    ScheduleModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    CalendarModule,
    DayPilotModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    TabViewModule,
    CodeHighlighterModule,
    FileUploadModule,
    GrowlModule,
    OrderListModule,
    DataGridModule,
    PanelModule,
    DataListModule,
    OverlayPanelModule,
    ChartModule,
    InputSwitchModule
  ],
  providers: [AuthService,
              InfoService,
              AppointmentService,
              AdminService,
              StaffService,
              SearchService,
              ContactService,
              PrescriptionService,
              AuthGuard,
              NotAuthGuard,
              AdminPermissionGuard,
              StaffPermissionGuard,
              UserPermissionGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
