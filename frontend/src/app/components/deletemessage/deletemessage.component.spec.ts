import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemessageComponent } from './deletemessage.component';

describe('DeletemessageComponent', () => {
  let component: DeletemessageComponent;
  let fixture: ComponentFixture<DeletemessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletemessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletemessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
