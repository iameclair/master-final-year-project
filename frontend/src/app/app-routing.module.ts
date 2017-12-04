import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ResetComponent } from './components/reset/reset.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PatientinfoComponent } from './components/patientinfo/patientinfo.component';
import { MainComponent } from './components/main/main.component';
import { ManagementComponent } from './components/management/management.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { ContactdoctorComponent } from './components/contactdoctor/contactdoctor.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard} from "./guards/notauth.guard";
import { AdminPermissionGuard} from "./guards/adminpermission.guard";
import { StaffPermissionGuard} from "./guards/staffpermission.guard";
import { DetailsComponent} from "./components/details/details.component";
import { ActivationviewComponent } from "./components/activationview/activationview.component";
import { ActivateaccountComponent } from "./components/activateaccount/activateaccount.component";
import { StaffComponent } from "./components/staff/staff.component";
import { AdminloginComponent } from "./components/adminlogin/adminlogin.component";
import { StaffloginComponent } from "./components/stafflogin/stafflogin.component";
import { AddstaffComponent } from "./components/adminlogin/addstaff/addstaff.component";
import { DisplaypatientsComponent } from "./components/adminlogin/displaypatients/displaypatients.component";
import { AdminviewComponent } from "./components/adminview/adminview.component";
import { StaffviewComponent } from "./components/staffview/staffview.component";
import { ManagestaffComponent } from "./components/managestaff/managestaff.component";
import { MakeappointmentComponent } from "./components/makeappointment/makeappointment.component";
import { BookingComponent } from "./components/booking/booking.component";
import { BookComponent } from "./components/book/book.component";
import { MedicalhistoryComponent } from "./components/medicalhistory/medicalhistory.component";
import { UploadfileComponent } from "./components/uploadfile/uploadfile.component";
import {DeletemessageComponent} from "./components/deletemessage/deletemessage.component";
import {CancelappointmentComponent} from "./components/cancelappointment/cancelappointment.component";
import {UpdatetimeslotComponent} from "./components/updatetimeslot/updatetimeslot.component";
import {DeletetimeslotComponent} from "./components/deletetimeslot/deletetimeslot.component";
import {CancelpatientComponent} from "./components/cancelpatient/cancelpatient.component";
import {SeepatientComponent} from "./components/seepatient/seepatient.component";
import {DeletestaffComponent} from "./components/deletestaff/deletestaff.component";
import {ContactComponent} from "./components/contact/contact.component";
import {MycalendarComponent} from "./components/mycalendar/mycalendar.component";
import {TimetableComponent} from "./components/timetable/timetable.component";

//build route
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},
  {path: 'account_activation', component: ActivationviewComponent, canActivate: [NotAuthGuard]},
  {path: 'activate_account/:token', component: ActivateaccountComponent, canActivate: [NotAuthGuard]},
  {path: 'information', component: DetailsComponent, canActivate: [NotAuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: 'provideemail', component: ResetpasswordComponent, canActivate: [NotAuthGuard]},
  {path: 'resetpassword/:token', component: ResetComponent, canActivate: [NotAuthGuard]},
  {path: 'admin_login', component: AdminloginComponent, canActivate: [AuthGuard]},
  {path: 'staff_login', component: StaffloginComponent, canActivate: [AuthGuard]},
  {path: 'details', component: PatientinfoComponent, canActivate: [AuthGuard] },
  {path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard]},
  {path: 'appointment/booking/:id', component: BookingComponent, canActivate: [AuthGuard]},
  {path: 'appointment/book/:id', component: BookComponent, canActivate: [AuthGuard]},
  {path: 'prescription', component: PrescriptionComponent, canActivate: [AuthGuard]},
  {path: 'contact_doctor', component: ContactdoctorComponent, canActivate: [AuthGuard]},
  {path: 'contact_doctor/:email', component: ContactdoctorComponent, canActivate: [AuthGuard]},
  {path: 'management', component: ManagementComponent, canActivate:[AuthGuard, AdminPermissionGuard]},
  {path: 'management/addstaff', component: AddstaffComponent, canActivate:[AuthGuard, AdminPermissionGuard]},
  {path: 'management/viewpatients', component: DisplaypatientsComponent, canActivate:[AuthGuard, AdminPermissionGuard]},
  {path: 'admin', component: AdminviewComponent, canActivate:[AuthGuard, AdminPermissionGuard]},
  {path: 'management/manage_staff', component: ManagestaffComponent, canActivate:[AuthGuard, AdminPermissionGuard]},
  {path: 'staffview', component: StaffviewComponent, canActivate:[AuthGuard, StaffPermissionGuard]},
  {path: 'staff', component: StaffComponent, canActivate:[AuthGuard, StaffPermissionGuard]},
  {path: 'create-appointment/:id', component: MakeappointmentComponent, canActivate:[AuthGuard, StaffPermissionGuard]},
  {path: 'gpassistant', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'avatar', component: UploadfileComponent, canActivate: [AuthGuard]},
  {path: 'delete-message/:id', component: DeletemessageComponent, canActivate: [AuthGuard]},
  {path: 'cancel-appointment/:id', component: CancelappointmentComponent, canActivate:[AuthGuard]},
  {path: 'view-patient-details/:id', component: SeepatientComponent, canActivate: [AuthGuard, StaffPermissionGuard]},
  {path: 'update-timeslot/:id', component: UpdatetimeslotComponent, canActivate:[AuthGuard, StaffPermissionGuard]},
  {path: 'delete-timeslot/:id', component: DeletetimeslotComponent, canActivate: [AuthGuard, StaffPermissionGuard]},
  {path: 'cancel-appointment-with-patient/:id', component: CancelpatientComponent, canActivate:[AuthGuard,
    StaffPermissionGuard]},
  {path: 'delete-staff/:id', component: DeletestaffComponent, canActivate:[AuthGuard, AdminPermissionGuard]},
  {path: 'contact-user/:id', component: ContactComponent, canActivate:[AuthGuard]},
  {path: 'report-and-medical-history/:userId/:appId', component: MedicalhistoryComponent,
    canActivate:[AuthGuard, StaffPermissionGuard]},
  {path: 'calendar', component: MycalendarComponent},
  {path: 'create-timetable', component: TimetableComponent, canActivate:[AuthGuard, StaffPermissionGuard]},
  {path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
