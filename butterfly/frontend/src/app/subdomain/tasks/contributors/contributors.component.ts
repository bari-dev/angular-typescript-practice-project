import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubdomainAuthService } from '../../../core/services/subdomain-auth.service';
import { TasklistService } from '../../../core/services/tasklist.service';
import { ButterflyClientApi } from '../../../core/api/ClientApi';
import UserInterface from '../../../core/interfaces/models/user.interface';

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
  curretnUser: UserInterface | null = null;
  tasklistCreatorId?: number;

  constructor(private _subdomainAuthService: SubdomainAuthService, private butterflyClientApi: ButterflyClientApi) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasklist'] && this.tasklist) {
      this.tasklistCreatorId = this.tasklist.creatorId;
      this.curretnUser = this._subdomainAuthService.getUser();
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

  removeContributor(contributor: any): void {
    this.butterflyClientApi.removeContributor(this.tasklist.slug, contributor?.TasklistMember?.memberId).then(() => {
      this.tasklistMembers = this.tasklistMembers.filter(member => member.id !== contributor.id)
    }).catch((error) => {
      console.error('Error removing contributor:', error);
    })
  }
}
