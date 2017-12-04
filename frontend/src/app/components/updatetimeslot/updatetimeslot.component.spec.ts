import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetimeslotComponent } from './updatetimeslot.component';

describe('UpdatetimeslotComponent', () => {
  let component: UpdatetimeslotComponent;
  let fixture: ComponentFixture<UpdatetimeslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatetimeslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
