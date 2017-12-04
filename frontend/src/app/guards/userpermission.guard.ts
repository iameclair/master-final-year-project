import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InfoService } from '../services/info.service';

@Injectable()
export class UserPermissionGuard implements CanActivate{

  permissions = ['user', 'staff', 'superuser'];
  permission;

  constructor(private infoService: InfoService,
              private router: Router) {
    this.infoService.getUserPermission().subscribe(data =>{
      this.permission = data.permission;
    });
  }
  canActivate(){
    if(this.permission === this.permissions[0]){
      return true;
    } else{
      this.router.navigate(['/home']);
      return false;
    }
  }

}
