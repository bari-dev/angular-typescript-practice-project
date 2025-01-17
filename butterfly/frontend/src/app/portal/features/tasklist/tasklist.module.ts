import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasklistComponent } from './tasklist.component';
import { TasklistRoutingModule } from './tasklist-routing.module';
import { AllTasklistComponent } from './all-tasklist/all-tasklist.component';
import { TasklistNewComponent } from './tasklist-new/tasklist-new.component';

// Angular Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    TasklistComponent,
    AllTasklistComponent,
    TasklistNewComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    TasklistRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    DatePipe
  ]
})
export class TasklistModule { }
