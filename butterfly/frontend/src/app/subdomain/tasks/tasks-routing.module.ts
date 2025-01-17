import { Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';

export default [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: 'new',
    component: AddTaskComponent,
  },
] as Routes;