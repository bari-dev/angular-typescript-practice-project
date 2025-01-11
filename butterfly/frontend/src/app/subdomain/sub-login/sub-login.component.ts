import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubdomainAuthService } from 'src/app/core/services/subdomain-auth.service';

@Component({
  selector: 'app-sub-login',
  templateUrl: './sub-login.component.html',
  styleUrls: ['./sub-login.component.css']
})
export class SubLoginComponent implements OnDestroy {
  username = '';
  password = '';
  loginMessage = '';
  isSuccess = false;

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private subdomainAuthService: SubdomainAuthService) {}

  onLogin(): void {
    this.router.navigateByUrl('/tasks');
    // this.subdomainAuthService.login(this.username, this.password)
  }

  ngOnDestroy(): void {
    const currentUrl = this.router.url;
    console.log(`Navigating back to: ${currentUrl}`);
    this.router.navigateByUrl(currentUrl);
  }
}
