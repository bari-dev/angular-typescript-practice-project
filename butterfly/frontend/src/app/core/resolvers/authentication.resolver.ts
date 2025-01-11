import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubdomainAuthService } from '../services/subdomain-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationResolver implements Resolve<boolean> {
  constructor(private authService: SubdomainAuthService) {}

  resolve(): Observable<boolean> {
    return of(this.authService.isAuthenticated());
  }
}
