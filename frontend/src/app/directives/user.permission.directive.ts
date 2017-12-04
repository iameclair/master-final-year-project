import {Directive, ElementRef} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Directive({
  selector: '[p-patient]'
})

export class UserDirective{
  constructor(private elementRef: ElementRef,
              private authService: AuthService){
    if(!authService.patient()){
      elementRef.nativeElement.style.display = 'none';
    }

  }
}

