import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaeforceComponent } from './salaeforce.component';

describe('SalaeforceComponent', () => {
  let component: SalaeforceComponent;
  let fixture: ComponentFixture<SalaeforceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaeforceComponent]
    });
    fixture = TestBed.createComponent(SalaeforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
