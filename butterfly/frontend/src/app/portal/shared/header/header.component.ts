import { Component } from '@angular/core';

@Component({
  selector: 'portal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  data = {
    title: 'Butterfly',
    toolbar: {
      buttons: [
        { name: 'Button 2', icon: 'search', link: '/search' }
      ],
      menus: [
        {
          name: 'Menu 1',
          icon: 'menu',
          width: 300,
          actions: [
            { name: 'Action 1', completed: true, error: false, message: 'Action 1 clicked' },
            { name: 'Action 2', completed: false, error: true, message: 'Action 2 clicked' }
          ]
        }
      ]
    }
  };

  toggleSidenav(position: string): void {
    console.log(`Toggling sidenav: ${position}`);
  }

  toast(message: string): void {
    console.log(`Toast message: ${message}`);
  }
}
