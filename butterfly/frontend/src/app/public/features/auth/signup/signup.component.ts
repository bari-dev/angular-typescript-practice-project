import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm?: NgForm;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(signupForm: NgForm) {
    const signupObj = {
      firstName: signupForm.value.firstName,
      lastName: signupForm.value.lastName,
      email: signupForm.value.email,
      password: signupForm.value.password,
    };
    if (
      signupForm.value.email &&
      signupForm.value.password
    ) {
      this.authService.signup(signupObj);
      this.router.navigateByUrl('/dashboard');
    } else {
      alert('Invalid username or password.');
    }
  }
}
