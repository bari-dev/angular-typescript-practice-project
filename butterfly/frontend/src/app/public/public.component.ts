import { Component } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { slideInAnimation } from '../animations';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class PublicComponent {
  constructor(private contexts: ChildrenOutletContexts, private router: Router, private _authService: AuthService) { 
    if (this._authService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    } 
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
