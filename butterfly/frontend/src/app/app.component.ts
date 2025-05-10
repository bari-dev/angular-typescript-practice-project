import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {
    if(this.router.url === '/' && this.authService.isAuthenticated()){
      this.router.navigateByUrl('/dashboard');
    }
  }
}
