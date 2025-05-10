import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasklistNewComponent } from './tasklist-new/tasklist-new.component';
import { AllTasklistComponent } from './all-tasklist/all-tasklist.component';
import { TasklistEditComponent } from './tasklist-edit/tasklist-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AllTasklistComponent
      },
      {
        path: 'new',
        component: TasklistNewComponent
      },
      {
        path: 'edit',
        component: TasklistEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasklistRoutingModule { }
