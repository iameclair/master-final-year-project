import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetimeslotComponent } from './deletetimeslot.component';

describe('DeletetimeslotComponent', () => {
  let component: DeletetimeslotComponent;
  let fixture: ComponentFixture<DeletetimeslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletetimeslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletetimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
