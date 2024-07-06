import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriateCompensatoryRequestModalComponent } from './criate-compensatory-request-modal.component';

describe('CriateCompensatoryRequestModalComponent', () => {
  let component: CriateCompensatoryRequestModalComponent;
  let fixture: ComponentFixture<CriateCompensatoryRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriateCompensatoryRequestModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriateCompensatoryRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
