import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import {AuthGuard} from "../../guards/auth.guard";

@Component({
  selector: 'app-activateaccount',
  templateUrl: './activateaccount.component.html',
  styleUrls: ['./activateaccount.component.css']
})
export class ActivateaccountComponent implements OnInit {

  messageClass;
  message;
  token;
  user;
  processing = false;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute)
  {

    this.route.params.subscribe(data =>{
      this.token = data['token'];
    });
    this.authService.activateAccount(this.token).subscribe(data => {
      if(data.success){
        this.messageClass = "alert alert-success";
        this.message = data.message;
        //call login service email and password
        setTimeout(() => {
          this.router.navigate(['/information']);
        }, 2500);
      }else{
        this.messageClass = "alert alert-danger";
        this.message = data.message;
      }

    });
  }

  ngOnInit() {
  }

}
