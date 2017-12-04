import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactdoctorComponent } from './contactdoctor.component';

describe('ContactdoctorComponent', () => {
  let component: ContactdoctorComponent;
  let fixture: ComponentFixture<ContactdoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactdoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
