import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  private hasSubdomain(): boolean {
    const hostname = window.location.hostname;
    const domainParts = hostname.split('.');
    console.log(domainParts);
    return domainParts.length > 2;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.hasSubdomain()) {
      return true;
    } else {
      this.router.navigateByUrl('/slogin');
      return false;
    }
  }
}
