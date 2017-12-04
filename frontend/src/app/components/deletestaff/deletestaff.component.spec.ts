import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletestaffComponent } from './deletestaff.component';

describe('DeletestaffComponent', () => {
  let component: DeletestaffComponent;
  let fixture: ComponentFixture<DeletestaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletestaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletestaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
