import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

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
export class ContributorsComponent {
  @Input() tasklist: any = null;

  tasklistMembers: any[] = [];
  showModal: boolean = false;

  openModal(): void {
    this.tasklistMembers = this.tasklist.users || [];
    this.showModal = true;
  }

  closeDialog(): void {
    this.tasklistMembers = [];
    this.showModal = false;
  }
}
