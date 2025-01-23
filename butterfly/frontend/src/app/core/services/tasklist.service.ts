import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 
import { env } from 'src/environments/environment';
import TasklistInterface from '../interfaces/models/tasklist.interface';

const BASE_URL = `${env.apiBaseUrl}/tasklists`;

@Injectable({
  providedIn: 'root'
})
export class TasklistService {
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  getTasklists(page: number = 1, pageSize: number = 5, filterOption: string = 'all'): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}&filterOption=${filterOption}`, { headers });
  }

  createTasklist(newTasklist: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl, newTasklist, { headers });
  }

  updateTasklist(id: string, updatedTasklist: any): Observable<any> {
    const headers = this.getAuthHeaders();  
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedTasklist, { headers });
  }

  deleteTasklist(id: string): Observable<any> {
    const headers = this.getAuthHeaders();  
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  getTasklistById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();  
    return this.http.get<TasklistInterface>(`${this.apiUrl}/${id}`, { headers });
  }
}
