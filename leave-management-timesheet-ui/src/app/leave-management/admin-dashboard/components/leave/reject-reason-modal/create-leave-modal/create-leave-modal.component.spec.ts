import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeaveModalComponent } from './create-leave-modal.component';

describe('CreateLeaveModalComponent', () => {
  let component: CreateLeaveModalComponent;
  let fixture: ComponentFixture<CreateLeaveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLeaveModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLeaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
