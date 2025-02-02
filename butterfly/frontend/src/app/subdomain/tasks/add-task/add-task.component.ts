import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SubdomainAuthService } from '../../../core/services/subdomain-auth.service';
import { TaskService } from '../task.service';
import { TaskInterface } from '../../../core/interfaces/models/task.interface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class AddTaskComponent implements OnInit {
  @Output() taskCreated = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<void>();

  task?: TaskInterface;
  taskTitle: string = '';
  taskDescription: string = '';
  taskCompleted: boolean = false;
  taskDeadline: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;
  currentDate: string;
  tasklistSlug?: string;
  btnText?: string = 'Create Task';

  constructor(
    private _subdomainAuthService: SubdomainAuthService,
    private dialog: MatDialog,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialogRef: MatDialogRef<AddTaskComponent>,
  ) {
    if(data){
      this.task = data.taskToEdit;
      this.tasklistSlug = data.tasklistSlug;
    }
    const now = new Date();
    this.currentDate = now.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    if (this.task) {
      this.taskTitle = this.task.title;
      this.taskDescription = this.task.description;
      this.taskCompleted = this.task.completed;
      this.taskDeadline = this.task.deadline.slice(0, 16);
      this.btnText = 'Update Task';
    }
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    if (!this.taskTitle || !this.taskDescription || !this.taskDeadline) {
      this.errorMessage = 'Please fill in all fields.';
      this.isSubmitting = false;
      return;
    }

    if (this.taskDeadline < this.currentDate && !this.task) {
      this.errorMessage = 'Please ensure the deadline is a future date.';
      this.isSubmitting = false;
      return;
    }

    const newTask: any = {
      title: this.taskTitle,
      description: this.taskDescription,
      completed: this.taskCompleted,
      deadline: this.taskDeadline,
      creatorId: this._subdomainAuthService.getUser()?.id,
      tasklistSlug: this._subdomainAuthService.getTasklist().slug
    };

    try {
      if (this.task) {
        this.task = await this.taskService.updateTask(newTask, this.task.id, this._subdomainAuthService.getTasklist().slug);
      } else {
        this.task = await this.taskService.createTask(newTask);
      }

      this.closeSubmitDialog()
      this.resetFields();
    } catch (error: any) {
      this.errorMessage = error?.response.data.message
    } finally {
      this.isSubmitting = false;
    }
  }

  closeDialog(): void {
    this._matDialogRef.close();
  }

  closeSubmitDialog(): void {
    this._matDialogRef.close(this.task);
  }

  resetFields(): void {
    this.taskTitle = '';
    this.taskDescription = '';
    this.taskCompleted = false;
    this.taskDeadline = '';
    this.isSubmitting = false;
  }
}
