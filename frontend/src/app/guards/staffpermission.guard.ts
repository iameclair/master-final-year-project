import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class StaffPermissionGuard implements CanActivate{


  constructor(private authService: AuthService,
              private router: Router) {
  }
  canActivate(){

      if(this.authService.staff()){
        return true;
      }else {
        this.router.navigate(['/gpadmin']);
        return false;
      }

  }

}
