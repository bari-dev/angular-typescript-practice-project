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
  errorMessage: string | null = null;
  rememberMe: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit(loginForm: NgForm) {
    const loginObj = {
      email: loginForm.value.email,
      password: loginForm.value.password,
    };

    if (loginForm.valid) {
      this.errorMessage = null;
      this.authService.login(loginObj)
        .then((response) => {
          this.authService.setUserAndToken(response);
          this.router.navigateByUrl('/dashboard');
        })
        .catch((error) => {
          try {
            this.errorMessage = error.error.message;
          } catch (err: any) {
            this.errorMessage = 'An unknown error occurred. Please try again later.';
          }
        });
    } else {
      this.errorMessage = 'Please fill in both email and password.';
    }
  }
}
