import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/environments/environment';
import UserInterface from '../interfaces/models/user.interface';

const BASE_URL = `${env.apiBaseUrl}/subdomainAuth`;

@Injectable({
  providedIn: 'root'
})
export class SubdomainAuthService {
  isLoggedIn = false;
  tasklistSlug: string = window.location.hostname.split('.')[0];
  
  constructor(private http: HttpClient) { }

  setUserAndToken(response: any): void {
    localStorage.setItem(`${this.tasklistSlug}`, JSON.stringify({
      tasklist: JSON.stringify(response.tasklist),
      user: JSON.stringify(response.user),
      token: response.token,
      expireAt: new Date()
    }));
  }

  login(loginData: any){
    return this.http
      .post<any>(`${BASE_URL}/login`, loginData)
      .toPromise()
      .then((response) => {
        if (response.token) {
          this.tasklistSlug = response.tasklist.slug
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
    localStorage.removeItem(`${this.tasklistSlug}`);
    this.isLoggedIn = false;
  }

  getTasklist(): any {
    return JSON.parse(this.loadLocalStorageHash()?.tasklist || null);
  }

  getUser(): UserInterface | null {
    return JSON.parse(this.loadLocalStorageHash()?.user || null);
  }

  getToken(): string | null {
    return this.loadLocalStorageHash()?.token || null;
  }
  
  isAuthenticated(): boolean {
    return this.getToken() == null ? false : true;
  }

  loadLocalStorageHash(): any {
    const u = localStorage.getItem(this.tasklistSlug);
    if (u) return JSON.parse(u);

    return null;
  }

  isAllow(object: string, action: string): boolean {
    return true;
  }
}
