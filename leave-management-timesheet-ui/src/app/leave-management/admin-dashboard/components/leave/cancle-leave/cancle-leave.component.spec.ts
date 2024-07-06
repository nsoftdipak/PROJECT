import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancleLeaveComponent } from './cancle-leave.component';

describe('CancleLeaveComponent', () => {
  let component: CancleLeaveComponent;
  let fixture: ComponentFixture<CancleLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancleLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancleLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
