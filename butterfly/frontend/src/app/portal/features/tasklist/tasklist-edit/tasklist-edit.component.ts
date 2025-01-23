import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { TasklistService } from 'src/app/core/services/tasklist.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tasklist-edit',
  templateUrl: './tasklist-edit.component.html',
  styleUrls: ['./tasklist-edit.component.css'],
})
export class TasklistEditComponent {
  @Input() tasklist: any;
  tasklistName: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private tasklistService: TasklistService,
    private location: Location,
    private authService: AuthService
  ) {
    this.tasklist = window.history.state.tasklist;
    this.tasklistName = this.tasklist.name || '';
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.tasklistName.trim()) {
      this.isSubmitting = true;

      const newTasklist = { name: this.tasklistName };

      this.tasklistService.createTasklist(newTasklist).subscribe(
        (response) => {
          this.tasklistName = '';
          this.errorMessage = '';
          this.successMessage = 'TaskList created successfully!';
          this.goBack();
          this.isSubmitting = false;
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.isSubmitting = false;
        }
      );
    } else {
      this.errorMessage = 'TaskList Name is required!';
    }
  }
}
