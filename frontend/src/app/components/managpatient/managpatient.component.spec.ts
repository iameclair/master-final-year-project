import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagpatientComponent } from './managpatient.component';

describe('ManagpatientComponent', () => {
  let component: ManagpatientComponent;
  let fixture: ComponentFixture<ManagpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
