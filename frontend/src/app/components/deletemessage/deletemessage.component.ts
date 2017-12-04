import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { ContactService } from "../../services/contact.service"

@Component({
  selector: 'app-deletemessage',
  templateUrl: './deletemessage.component.html',
  styleUrls: ['./deletemessage.component.css']
})
export class DeletemessageComponent implements OnInit {

  messageClass; message;

  constructor(  private _activatedRoute: ActivatedRoute,
                private _contactService: ContactService,
                private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((data)=>{
      let messageId = data['id'];
      this._contactService.hideMessage(messageId).subscribe((data) => {
        if(!data.success){
          this.message = data.message;
          this.messageClass = 'alert alert-failure';
        }else{
          this.message = data.message;
          this.messageClass = 'alert alert-success';
          setTimeout(() =>{
            this._router.navigate(['/contact_doctor']);
          }, 2000)
        }
      });
    });
  }

}
