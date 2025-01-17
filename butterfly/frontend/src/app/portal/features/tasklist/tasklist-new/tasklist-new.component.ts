import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { TasklistService } from 'src/app/core/services/tasklist.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tasklist-new',
  templateUrl: './tasklist-new.component.html',
  styleUrls: ['./tasklist-new.component.css']
})
export class TasklistNewComponent {
  tasklistName: string = '';
  errorMessage: string = ''; 
  successMessage: string = ''; 
  isSubmitting: boolean = false;

  constructor(
    private tasklistService: TasklistService, 
    private location: Location,
    private authService: AuthService
  ) { }

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
          console.error('Error creating tasklist:', error); 
          this.errorMessage = 'An error occurred while creating the task list.';
          this.isSubmitting = false;
        }
      );
    } else {
      this.errorMessage = 'TaskList Name is required!'; 
    }
  }
}
