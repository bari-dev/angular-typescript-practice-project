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
export class ContributorsComponent implements OnChanges {
  @Input() tasklist: any = null;

  tasklistMembers: any[] = [];
  showModal: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasklist'] && this.tasklist) {
      this.tasklistMembers = this.tasklist.members || [];
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeDialog(): void {
    this.showModal = false;
  }

  closePanel(): void {
    this.tasklist = null;
  }
}
