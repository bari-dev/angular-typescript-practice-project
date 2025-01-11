import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditorComponent } from './task-editor.component';

describe('TodoEditorComponent', () => {
  let component: TodoEditorComponent;
  let fixture: ComponentFixture<TodoEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoEditorComponent]
    });
    fixture = TestBed.createComponent(TodoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
