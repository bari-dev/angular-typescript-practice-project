import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTasklistComponent } from './all-tasklist.component';

describe('AllTasklistComponent', () => {
  let component: AllTasklistComponent;
  let fixture: ComponentFixture<AllTasklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTasklistComponent]
    });
    fixture = TestBed.createComponent(AllTasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
