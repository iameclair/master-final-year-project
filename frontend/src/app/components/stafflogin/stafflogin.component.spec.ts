import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffloginComponent } from './stafflogin.component';

describe('StaffloginComponent', () => {
  let component: StaffloginComponent;
  let fixture: ComponentFixture<StaffloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
