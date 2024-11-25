import { Injectable } from '@angular/core';
import { Todo } from './modals/todo.modal';

@Injectable({
  providedIn: 'root'
})
export class TodoService{
  todos: Todo[] = [];

  getTodos(){
    return [...this.todos];
  }

  addTodo(todo: Todo){
    this.todos.push(todo);
  }

  deleteTodo(todo: Todo){
    this.todos = this.todos.filter(t => t.id !== todo.id);

    return true;
  }

  editTodo(todo: Todo){
    this.todos = this.todos.map(t => t.id === todo.id ? todo : t);

    return true;
  }
}
