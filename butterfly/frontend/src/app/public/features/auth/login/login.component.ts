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
  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(loginForm: NgForm) {
    this.authService.login();
    this.router.navigateByUrl('/');
    // if (
    //   loginForm.value.username === 'client' &&
    //   loginForm.value.password === '123456789'
    // ) {
    // } else {
    //   alert('Invalid username or password.');
    // }
  }
}
