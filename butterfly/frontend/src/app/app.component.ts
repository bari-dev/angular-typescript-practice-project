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

  displayedColumns: string[] = ['name', 'age', 'email'];
  data = [
    { name: 'John Doe', age: 28, email: 'john.doe@example.com' },
    { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
    { name: 'Alice Johnson', age: 25, email: 'alice.johnson@example.com' },
    { name: 'Bob Brown', age: 45, email: 'bob.brown@example.com' },
    { name: 'Charlie Black', age: 29, email: 'charlie.black@example.com' },
    // Add more sample data here
  ];
}
