import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CountdownComponent } from '../../../shared/countdown/countdown.component';
import { SubdomainAuthService } from '../../../core/services/subdomain-auth.service';
import { TaskService } from '../task.service';
import { AddUsersComponent } from '../add-users/add-users.component';
import { TasklistService } from '../../../core/services/tasklist.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TaskDetailsComponent,
    CountdownComponent,
    AddUsersComponent
  ]
})
export class TaskDetailsComponent implements OnChanges {
  @Input() tasklist: any;
  @Input() task: any;
  @Output() isModalOpen = new EventEmitter<boolean>(false);
  @Output() closeModal = new EventEmitter<void>();

  contributors: any[] = [];

  constructor(private _subdomainAuthService: SubdomainAuthService, private taskService: TaskService, private _tasklistService: TasklistService){
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.task = changes['task'].currentValue
      this.contributors = changes['task'].currentValue.users
      this.tasklist = changes['tasklist'].currentValue
      this.isModalOpen.emit(true);
    }
  }

  closePanel() {
    this.isModalOpen.emit(false);
    this.task = null;
    this.contributors = [];
    this.closeModal.emit();
  }

  markComplete() {
    if (this.task) {
      this.taskService.toggleStatus(this.tasklist.slug, this.task.id).then(data=>{
        this.task.completed = data.completed
      });
    }
  }

  editTask() {
  }

  addContributor(user: any) {
    if (user && !this.contributors.find(contrib => contrib.id === user.id)) {
      this.contributors.push(user);
    }
  }

  removeContributor(user: any) {
    this.contributors = this.contributors.filter(contrib => contrib.id !== user.id);
  }
}
