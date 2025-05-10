import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubdomainAuthService } from 'src/app/core/services/subdomain-auth.service';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sub-login',
  templateUrl: './sub-login.component.html',
  styleUrls: ['./sub-login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class SubLoginComponent implements OnDestroy {
  errorMessage: string | null = null;
  tasklistSlug: string = window.location.hostname.split('.')[0]


  constructor(private router: Router, private subdomainAuthService: SubdomainAuthService) {
    if(this.subdomainAuthService.isAuthenticated()){
      this.router.navigateByUrl('/tasks');
    }
  }

  onSubmit(loginForm: NgForm) {
    const loginObj = {
      email: loginForm.value.email,
      password: loginForm.value.password,
      tasklistSlug: this.tasklistSlug
    };

    if (loginForm.valid) {
      this.errorMessage = null;
      this.subdomainAuthService.login(loginObj)
        .then((response) => {
          this.subdomainAuthService.setUserAndToken(response);
          this.router.navigateByUrl('/tasks');
        })
        .catch((error) => {
          try {
            this.errorMessage = error.error.message;
          } catch (err: any) {
            this.errorMessage = 'An unknown error occurred. Please try again later.';
          }
        });
    } else {
      this.errorMessage = 'kindly fill all required fields.';
    }
  }

  ngOnDestroy() {
    this.errorMessage = '';
  }
}
