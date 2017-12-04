import {Directive, ElementRef} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Directive({
  selector: '[p-admin]'
})

export class AdminDirective{
  constructor(private elementRef: ElementRef,
              private authService: AuthService){
    if(!authService.admin()){
      elementRef.nativeElement.style.display = 'none';
    }

  }
}
