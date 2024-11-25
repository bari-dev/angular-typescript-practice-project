import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../modals/todo.modal';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() onDeleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();  // Ensure Todo is emitted

  constructor() {
    this.todo = {} as Todo;
  }

  ngOnInit(): void {}

  todoDelete() {
    this.onDeleteTodo.emit(this.todo);
  }
}
