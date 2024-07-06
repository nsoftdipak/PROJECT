import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveCalendarComponent } from './employee-leave-calendar.component';

describe('EmployeeLeaveCalendarComponent', () => {
  let component: EmployeeLeaveCalendarComponent;
  let fixture: ComponentFixture<EmployeeLeaveCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeLeaveCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeLeaveCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
