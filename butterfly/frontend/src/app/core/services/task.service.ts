import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private uri = 'tasks';

  // constructor(private http: HttpClient) {}

  // getTasks(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // updateTask(id: string, updatedTask: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, updatedTask);
  // }
}
