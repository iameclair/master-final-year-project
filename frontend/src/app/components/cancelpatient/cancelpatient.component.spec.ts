import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelpatientComponent } from './cancelpatient.component';

describe('CancelpatientComponent', () => {
  let component: CancelpatientComponent;
  let fixture: ComponentFixture<CancelpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
