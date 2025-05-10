import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userStats: any;

  constructor(private userService: UserService){
    this.userService.getUserStats().subscribe((res: any) => {
        this.userStats = res
      }
    )
  }
}
