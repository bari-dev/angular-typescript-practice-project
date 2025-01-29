import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  // Back Button Function (you can adjust to your routing logic)
  goBack() {
    // You can handle navigation logic here, like using Angular's Router
    // this.router.navigate(['/previous-page']);
  }

  // Form Submission Logic
  onSubmit() {
    if (this.isSubmitting) return; // Prevent double submission

    this.isSubmitting = true;

    // Example logic: Pretend to update the user settings
    setTimeout(() => {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        this.isSubmitting = false;
        return;
      }

      // If validation passes, pretend to save the data (API call, etc.)
      console.log('User Settings Updated:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      });

      // Clear the form and reset the status
      this.errorMessage = '';
      this.isSubmitting = false;
      alert('User settings have been successfully updated.');
    }, 1000); // Simulate a delay (e.g., API call)
  }
}
