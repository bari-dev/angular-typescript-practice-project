import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { env } from '../../../../../environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tasklist-new',
  templateUrl: './tasklist-new.component.html',
  styleUrls: ['./tasklist-new.component.css']
})
export class TasklistNewComponent {
  tasklistName: string = '';
  apiUrl: string = `${env.apiBaseUrl}/tasklists`;  
  authorizationToken: string | null = this.authService.getToken(); 
  errorMessage: string = ''; 
  successMessage: string = ''; 

  constructor(private http: HttpClient, private location: Location, private authService: AuthService) { }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.tasklistName.trim()) {
      const requestPayload = {
        name: this.tasklistName
      };

      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authorizationToken}`);

      this.http.post(this.apiUrl, requestPayload, { headers })
        .pipe(
          catchError(error => {
            console.error('Error occurred during the POST request:', error);
            this.errorMessage = 'An error occurred while creating the TaskList. Please try again later.';
            return of(error);
          })
        )
        .subscribe(
          (response) => {
            console.log('TaskList created successfully:', response);
            this.tasklistName = '';  
            this.errorMessage = '';  
            this.successMessage = 'TaskList created successfully!';  
            this.goBack();
          },
          (error) => {
            this.errorMessage = 'An error occurred while creating the TaskList. Please try again later.';
            console.error('Error:', error);
          }
        );
    } else {
      this.errorMessage = 'TaskList Name is required!';
    }
  }
}
