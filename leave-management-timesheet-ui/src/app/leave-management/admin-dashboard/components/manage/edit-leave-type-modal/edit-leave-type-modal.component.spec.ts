import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaveTypeModalComponent } from './edit-leave-type-modal.component';

describe('EditLeaveTypeModalComponent', () => {
  let component: EditLeaveTypeModalComponent;
  let fixture: ComponentFixture<EditLeaveTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLeaveTypeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLeaveTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
