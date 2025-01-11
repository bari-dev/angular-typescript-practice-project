import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { env } from '../../../../environments/environment';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent {
  tasklistName: string = '';
  apiUrl: string = env.apiBaseUrl;
  authorizationToken: string = 'your-bearer-token-here';

  constructor(private http: HttpClient) {}

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
            return of(error);
          })
        )
        .subscribe(response => {
          console.log('Column created successfully:', response);
          this.tasklistName = '';
        });
    } else {
      console.log('Column name is required!');
    }
  }
}
