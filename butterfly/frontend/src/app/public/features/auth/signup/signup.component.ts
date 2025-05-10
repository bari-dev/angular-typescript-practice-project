import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { last, of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  async onSubmit(signupForm: NgForm) {
    const signupObj = {
      firstName: signupForm.value.firstName,
      lastName: signupForm.value.lastName,
      email: signupForm.value.email,
      password: signupForm.value.password,
    };
    if (signupForm.valid) {
      this.errorMessage = null;
      this.authService.signup(signupObj)
        .then((response) => {
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
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
