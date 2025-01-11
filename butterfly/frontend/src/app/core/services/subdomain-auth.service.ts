import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/environments/environment';

const BASE_URL = `${env.apiBaseUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SubdomainAuthService {

  private token: string | null = localStorage.getItem('auth_token');
  isLoggedIn = false;
  
  constructor(private http: HttpClient) { }

  login(username: string, password: string): void {
    const loginData = { username: username, password: password };
    this.http.post(`${BASE_URL}/sublogin`, loginData).subscribe((res: any)=>{
      if(res.token !== undefined) {
        localStorage.setItem('token', res.token);
        this.isLoggedIn = true;
        return true;
      } else {
        alert(res.message);

        return false;
      }
    })
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  getAuthHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  getTasksForTaskList(slug: string): Observable<any> {
    return this.http.get(`${BASE_URL}/tasklists/${slug}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateTask(taskId: number, taskData: any, slug: string): Observable<any> {
    return this.http.put(`${BASE_URL}/tasklists/${slug}/tasks/${taskId}`, taskData, {
      headers: this.getAuthHeaders(),
    });
  }
}
