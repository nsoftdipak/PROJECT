import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimeoffComponent } from './employee-timeoff.component';

describe('EmployeeTimeoffComponent', () => {
  let component: EmployeeTimeoffComponent;
  let fixture: ComponentFixture<EmployeeTimeoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeTimeoffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeTimeoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
