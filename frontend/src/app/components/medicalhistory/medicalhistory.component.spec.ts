import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalhistoryComponent } from './medicalhistory.component';

describe('MedicalhistoryComponent', () => {
  let component: MedicalhistoryComponent;
  let fixture: ComponentFixture<MedicalhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
