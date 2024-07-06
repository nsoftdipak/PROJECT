import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeaveRequestSettingComponent } from './create-leave-request-setting.component';

describe('CreateLeaveRequestSettingComponent', () => {
  let component: CreateLeaveRequestSettingComponent;
  let fixture: ComponentFixture<CreateLeaveRequestSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLeaveRequestSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLeaveRequestSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
