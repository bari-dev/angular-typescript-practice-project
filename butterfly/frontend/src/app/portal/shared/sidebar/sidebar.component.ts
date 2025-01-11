import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'portal-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activeTab: string = '';

  data = {
    user: {
      icon: 'account_circle',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    sidenav: {
      sections: [
        {
          name: 'Section 1',
          expand: false,
          actions: [
            { name: 'Action 1', icon: 'home', link: '/home' },
            { name: 'Action 2', icon: 'settings', link: '/settings' },
          ],
        },
        {
          name: 'Section 2',
          expand: false,
          actions: [
            { name: 'Action 3', icon: 'info', link: '/info' },
            { name: 'Action 4', icon: 'help', link: '/help' },
          ],
        },
      ],
    },
  };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.setActiveTab();
    this.router.events.subscribe(() => {
      this.setActiveTab();
    });
  }

  setActiveTab(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/dashboard') {
      this.activeTab = 'dashboard';
    } else if (currentRoute === '/tasklists') {
      this.activeTab = 'tasklists';
    } else if (currentRoute === '/saleforce') {
      this.activeTab = 'saleforce';
    } else if (currentRoute === '/settings') {
      this.activeTab = 'settings';
    } else {
      this.activeTab = '';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
