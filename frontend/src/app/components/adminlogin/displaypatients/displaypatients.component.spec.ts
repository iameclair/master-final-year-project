import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaypatientsComponent } from './displaypatients.component';

describe('DisplaypatientsComponent', () => {
  let component: DisplaypatientsComponent;
  let fixture: ComponentFixture<DisplaypatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaypatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaypatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
