import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/environments/environment';
import UserInterface from '../interfaces/models/user.interface';

const BASE_URL = `${env.apiBaseUrl}/subdomainAuth`;

@Injectable({
  providedIn: 'root'
})
export class SubdomainAuthService {

  private token: string | null = localStorage.getItem('token');
  isLoggedIn = false;
  
  constructor(private http: HttpClient) { }

  setUserAndToken(response: any): void {
    localStorage.setItem('tasklist', JSON.stringify(response.tasklist));
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
  }

  login(loginData: any){
    return this.http
      .post<any>(`${BASE_URL}/login`, loginData)
      .toPromise()
      .then((response) => {
        if (response.token) {
          this.isLoggedIn = true;
          return response;
        } else {
          throw new Error('Login failed');
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tasklist');
    this.isLoggedIn = false;
  }

  getToken(): string | null {
    return this.token;
  }

  getTasklist(): any {
    const tasklist = localStorage.getItem('tasklist');
    return tasklist ? JSON.parse(tasklist) : null;
  }

  getUser(): UserInterface | null {
    const u = localStorage.getItem('user');
    if (u) return JSON.parse(u);

    return null;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') == null ? false : true;
  }
}
