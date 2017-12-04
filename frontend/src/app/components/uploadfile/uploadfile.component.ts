import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import {Router} from "@angular/router";

const URL = "http://localhost:8080/information/avatar";

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {

  message; messageClass; uploaded: boolean=false;

  public uploader:FileUploader = new FileUploader({url: URL,
    itemAlias: 'avatar',
    allowedMimeType: ['image/jpeg','image/png', 'image/gif'],
  });

  constructor(private router: Router) {
  }
  ngOnInit() {
    this.uploader.onBeforeUploadItem = (file) =>{
      file.withCredentials = false;
      this.uploader.authToken = localStorage.getItem('token');
    };
    /*this.uploader.onAfterAddingFile = (file) => {

    };*/

    this.uploader.onCompleteItem = (item:any, response: any, status: any, headers:any)=>{
      this.uploaded = true;
      console.log('This uploaded is: '+ this.uploaded);
      console.log("ImageUpload:Uploaded:", item, status, response);
    };

  }

}
