import {Injectable} from "@angular/core";
import {STEPS} from "./appointmentWorkflow.model";

@Injectable()

export class AppointmentWorkflowService{
  private workflow = [
    { step: STEPS.pickDoctor, valid: false},
    { step: STEPS.pickSlot, valid: false},
    { step: STEPS.bookSlot, valid: false}
  ];

  public validateStep(step: string){
    let found = false;
    for(let i = 0; i < this.workflow.length && !found; i++){
      if(this.workflow[i].step === step){
        found = this.workflow[i].valid = true;
      }
    }
  }

  public resetSteps(){
    this.workflow.forEach(step =>{
      step.valid = false;
    })
  }

  public getFirstInvalidStep(step: string) : string{
    let found = false;
    let valid = true;
    let redirectToStep = '';
    for(let i = 0; i < this.workflow.length && !found && valid; i++){
      let item = this.workflow[i];
      if(item.step === step) {
        found = true;
        redirectToStep = '';
      }else{
        valid = item.valid;
        redirectToStep = item.step;
      }
    }

    return redirectToStep;
  }

}
