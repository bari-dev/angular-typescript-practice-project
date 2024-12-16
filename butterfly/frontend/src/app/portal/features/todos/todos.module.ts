import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoEditorComponent } from './todo-editor/todo-editor.component';
import { TodosComponent } from './todos/todos.component';


@NgModule({
  declarations: [
    TodosListComponent,
    TodoDetailComponent,
    TodoEditorComponent,
    TodosComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
