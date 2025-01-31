import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubdomainAuthService } from '../../../core/services/subdomain-auth.service';

@Component({
  selector: 'app-contributors',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css'],
})
export class ContributorsComponent implements OnChanges {
  @Input() tasklist: any = null;

  tasklistMembers: any[] = [];
  showModal: boolean = false;
  isCreator: boolean = false;

  constructor(private _subdomainAuthService: SubdomainAuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasklist'] && this.tasklist) {
      this.isCreator = this._subdomainAuthService.getUser()?.id === this.tasklist.creatorId;
      this.tasklistMembers = this.tasklist.users || [];
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeDialog(): void {
    this.showModal = false;
  }

  removeMember(member: any): void {
    // You can implement the removeMember logic here if required
  }
}
