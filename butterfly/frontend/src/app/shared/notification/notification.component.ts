import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatIconModule, CommonModule, NgForOf],
  template: `
    <span class="relative">
      <button mat-icon-button class="relative flex justify-center items-center" (click)="toggleModal()" aria-label="Notifications">
        <mat-icon>notifications</mat-icon>
        <span *ngIf="unreadCount > 0" class="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full text-xs px-2 py-1">
          {{ unreadCount }}
        </span>  
      </button>

      <div *ngIf="isModalOpen" class="absolute right-0 mt-2 w-80 bg-[#313131] shadow-lg rounded-lg overflow-hidden z-50">
        <div class="p-4 border-[#212121]-700">
          <h2 class="text-[10px] font-semibold text-center">Notifications</h2>
        </div>
        <div class="max-h-[200px] overflow-y-auto p-2">
          <div *ngFor="let notification of notifications$ | async" 
               class="p-2 mb-2 rounded-lg shadow-sm flex justify-between items-center cursor-pointer text-[15px]"
               [ngClass]="{
                 'bg-green-100 text-green-800': notification.type === 'success',
                 'bg-red-100 text-red-800': notification.type === 'error',
                 'bg-blue-100 text-blue-800': notification.type === 'info',
                 'opacity-50': notification.read
               }"
               (click)="markAsRead(notification.id)">
            <div class="text-[15px]">
              <div>{{ notification.title }}</div>
              <div>{{ notification.description }}</div>
            </div>
          </div>
        </div>
        <div class="p-2 text-center text-[15px]">
          <button (click)="closeModal()" class="text-gray-500 hover:text-gray-700">
            Close
          </button>
        </div>
      </div>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
  notifications$ = this.notificationService.notifications$;
  isModalOpen = false;
  unreadCount = 0;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications$.subscribe((notifications: any) => {
      this.unreadCount = notifications.filter((notification: any) => !notification.read).length;
    });
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('app-notification');
    if (!clickedInside) {
      this.closeModal();
    }
  }
}
