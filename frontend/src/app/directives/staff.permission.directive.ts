import {Directive, ElementRef} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Directive({
  selector: '[p-staff]'
})

export class StaffDirective{
  constructor(private elementRef: ElementRef,
              private authService: AuthService){
    if(!authService.staff()){
      elementRef.nativeElement.style.display = 'none';
    }

  }
}
