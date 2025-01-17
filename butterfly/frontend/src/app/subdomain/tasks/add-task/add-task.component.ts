import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../task.service';
import { SubdomainAuthService } from '../../../core/services/subdomain-auth.service';

@Component({
  selector: 'app-create-task',
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
  taskTitle: string = '';
  taskDescription: string = '';
  taskCompleted: boolean = false;
  taskDeadline: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  currentDate: string;

  constructor(private _subdomainAuthService: SubdomainAuthService,private dialog: MatDialog, private taskService: TaskService) {
    const now = new Date();
    this.currentDate = now.toISOString().slice(0, 16);
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    if (!this.taskTitle || !this.taskDescription || !this.taskDeadline) {
      this.errorMessage = 'Please fill in all fields.';
      this.isSubmitting = false;
      return;
    }

    if (this.taskDeadline <= this.currentDate) {
      this.errorMessage = 'Please ensure the deadline is a future date.';
      this.isSubmitting = false;
      return;
    }

    const newTask = {
      title: this.taskTitle,
      description: this.taskDescription,
      completed: this.taskCompleted,
      deadline: this.taskDeadline,
      creatorId: this._subdomainAuthService.getUser(),
      tasklistSlug: this._subdomainAuthService.getTasklist().slug
    }

    try {
      const createdTask = await this.taskService.createTask(newTask);

      this.dialog.closeAll();
      this.resetFields();
      console.log('Task created successfully:', createdTask);

    } catch (error) {
      this.errorMessage = 'Error creating task. Please try again later.';
    } finally {
      this.isSubmitting = false;
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  resetFields(): void {
    this.taskTitle = '';
    this.taskDescription = '';
    this.taskCompleted = false;
    this.taskDeadline = '';
    this.isSubmitting = false;
  }
}
