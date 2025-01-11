import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    } 
  }

  async onSubmit(loginForm: NgForm) {
    const loginObj = {
      email: loginForm.value.email,
      password: loginForm.value.password,
    };
    if (
      loginForm.value.email &&
      loginForm.value.password
    ) {
      await this.authService.login(loginObj);
      this.router.navigateByUrl('/dashboard');
      
    } else {
      alert('Invalid username or password.');
    }
  }
}
