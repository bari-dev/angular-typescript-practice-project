import { Component } from '@angular/core';
import { Todo } from '../modals/todo.modal';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  todo: Todo = {} as Todo;
  constructor(public todoService: TodoService){}

  createTodo(){
    this.todoService.addTodo(this.todo);
  }
}
