

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginObject } from '../interfaces/login.interface';
import { SignupObject } from '../interfaces/signup.interface';
import { env } from 'src/environments/environment';

const BASE_URL = `${env.apiBaseUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  async login(loginObj: LoginObject) {
    this.http.post(`${BASE_URL}/login`, loginObj).subscribe((res: any)=>{
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

  signup(signupObj: SignupObject) {
    this.http.post(`${BASE_URL}/register`, signupObj).subscribe((res: any)=>{
      if(res.result) {
        localStorage.setItem('token', res.token);
        this.isLoggedIn = true;
        return true;
      } else {
        alert(res.message);

        return false;
      }
    })
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
