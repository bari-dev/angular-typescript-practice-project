import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskEditorComponent } from './task-editor/task-editor.component';
import { TasksComponent } from './tasks.component';
import { TaskNewComponent } from './task-new/task-new.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TasksComponent,
    TaskNewComponent,
    TaskDetailComponent,
    TaskEditorComponent,
    TaskNewComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class TasksModule { }
