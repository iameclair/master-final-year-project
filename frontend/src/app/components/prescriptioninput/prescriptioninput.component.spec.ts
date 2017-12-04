import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptioninputComponent } from './prescriptioninput.component';

describe('PrescriptioninputComponent', () => {
  let component: PrescriptioninputComponent;
  let fixture: ComponentFixture<PrescriptioninputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptioninputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptioninputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
