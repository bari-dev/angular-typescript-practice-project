

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor() {}

  login(): Observable<boolean> {
    // (email: string, password: string): Observable<boolean> {
    this.isLoggedIn = true;
    return of(this.isLoggedIn);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private isLoggedIn = false;

//   login() {
//     this.isLoggedIn = true;
//   }

//   logout() {
//     this.isLoggedIn = false;
//   }

//   isAuthenticated(): boolean {
//     return this.isLoggedIn;
//   }
// }