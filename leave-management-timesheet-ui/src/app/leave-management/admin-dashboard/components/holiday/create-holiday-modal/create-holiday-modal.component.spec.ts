import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHolidayModalComponent } from './create-holiday-modal.component';

describe('CreateHolidayModalComponent', () => {
  let component: CreateHolidayModalComponent;
  let fixture: ComponentFixture<CreateHolidayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateHolidayModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateHolidayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
