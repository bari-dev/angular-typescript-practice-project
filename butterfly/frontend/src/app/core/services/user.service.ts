import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 
import { env } from 'src/environments/environment';

const BASE_URL = `${env.apiBaseUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  getProfile(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/profile`, { headers });
  }
}
