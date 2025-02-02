import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private authService: AuthService) {
    const user = this.authService.getUser();
    this.firstName = user?.firstName ?? '';
    this.lastName = user?.lastName ?? '';
    this.email = user?.email ?? '';
  }

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    setTimeout(() => {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        this.isSubmitting = false;
        return;
      }

      console.log('User Settings Updated:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      });

      this.errorMessage = '';
      this.isSubmitting = false;
      alert('User settings have been successfully updated.');
    }, 1000);
  }
}
