import { Component } from '@angular/core';

@Component({
  selector: 'portal-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
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

  isLockedOpen = true;

  toast(message: string): void {
    console.log('Toast:', message);
  }
}
