import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistNewComponent } from './tasklist-new.component';

describe('TasklistNewComponent', () => {
  let component: TasklistNewComponent;
  let fixture: ComponentFixture<TasklistNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasklistNewComponent]
    });
    fixture = TestBed.createComponent(TasklistNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
