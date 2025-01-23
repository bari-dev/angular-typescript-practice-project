import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistEditComponent } from './tasklist-edit.component';

describe('TasklistEditComponent', () => {
  let component: TasklistEditComponent;
  let fixture: ComponentFixture<TasklistEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasklistEditComponent]
    });
    fixture = TestBed.createComponent(TasklistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
