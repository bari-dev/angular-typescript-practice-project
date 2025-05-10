import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent {
  constructor() {
    this.getScreenSize();
  }

  scrHeight: any;
  scrWidth: any;
  isOpen = true;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;

    if (this.scrWidth < 768) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }
}
