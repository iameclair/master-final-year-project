import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepatientComponent } from './managepatient.component';

describe('ManagepatientComponent', () => {
  let component: ManagepatientComponent;
  let fixture: ComponentFixture<ManagepatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagepatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagepatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
