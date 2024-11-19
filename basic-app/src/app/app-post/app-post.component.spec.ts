import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPostComponent } from './app-post.component';

describe('AppPostComponent', () => {
  let component: AppPostComponent;
  let fixture: ComponentFixture<AppPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppPostComponent]
    });
    fixture = TestBed.createComponent(AppPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
