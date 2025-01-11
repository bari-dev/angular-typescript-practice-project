import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasklistNewComponent } from './tasklist-new/tasklist-new.component';
import { AllTasklistComponent } from './all-tasklist/all-tasklist.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasklistRoutingModule { }
