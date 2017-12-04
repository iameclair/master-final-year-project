import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { AdminService } from "../../services/admin.service"

@Component({
  selector: 'app-deletestaff',
  templateUrl: './deletestaff.component.html',
  styleUrls: ['./deletestaff.component.css']
})
export class DeletestaffComponent implements OnInit {

  public message; messageClass; userID;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _adminService: AdminService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(input =>{
      this.userID = input['id'];
      this._adminService.deleteUser(this.userID).subscribe(data =>{
        if(!data.success){
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          setTimeout(() =>{
            this._router.navigate(['/management']);
          }, 2500)
        }else{
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          setTimeout(() =>{
            this._router.navigate(['/management']);
          }, 2000)
        }
      })
    })
  }

}
