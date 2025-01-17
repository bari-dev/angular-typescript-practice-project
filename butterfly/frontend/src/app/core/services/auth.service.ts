

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginObject } from '../interfaces/login.interface';
import { SignupObject } from '../interfaces/signup.interface';
import { env } from 'src/environments/environment';
import UserInterface from '../interfaces/models/user.interface';

const BASE_URL = `${env.apiBaseUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<any>(`${BASE_URL}/login`, credentials)
      .toPromise()
      .then((response) => {
        if (response.token) {
          this.setUserAndToken(response);
          return response;
        } else {
          throw new Error('Login failed');
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  signup(signupObj: SignupObject): Promise<any> {
    return this.http.post(`${BASE_URL}/register`, signupObj).toPromise()
      .then((response: any) => {
        if (response.token) {
          this.setUserAndToken(response);
          return response;
        } else {
          return Promise.reject(new Error('SignUp failed'));
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  setUserAndToken(response: any): void {
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): UserInterface | null {
    const u = localStorage.getItem('user');
    if (u) return JSON.parse(u);

    return null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
