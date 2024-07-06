import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaveTypeModalComponent } from './update-leave-type-modal.component';

describe('UpdateLeaveTypeModalComponent', () => {
  let component: UpdateLeaveTypeModalComponent;
  let fixture: ComponentFixture<UpdateLeaveTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateLeaveTypeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateLeaveTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
