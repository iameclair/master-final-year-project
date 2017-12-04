import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationviewComponent } from './activationview.component';

describe('ActivationviewComponent', () => {
  let component: ActivationviewComponent;
  let fixture: ComponentFixture<ActivationviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
