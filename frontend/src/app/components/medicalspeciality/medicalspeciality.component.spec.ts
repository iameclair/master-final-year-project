import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalspecialityComponent } from './medicalspeciality.component';

describe('MedicalspecialityComponent', () => {
  let component: MedicalspecialityComponent;
  let fixture: ComponentFixture<MedicalspecialityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalspecialityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalspecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
