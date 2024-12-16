import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  constructor(private router: Router){}

  redirectToAnotherPage(redirectTo: string){
    this.router.navigateByUrl(redirectTo);
  }
}
