import { Component } from '@angular/core';
import { Todo } from '../modals/todo.modal';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos: Todo[] = [
    {
      id: '1',
      title: 'Todo 1',
      description: 'This is the first todo',
      completed: false
    },
    {
      id: '2',
      title: 'Todo 2',
      description: 'This is the second todo',
      completed: true
    },
    {
      id: '3',
      title: 'Todo 3',
      description: 'This is the third todo',
      completed: false
    }
  ].reverse();

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
  }
}
