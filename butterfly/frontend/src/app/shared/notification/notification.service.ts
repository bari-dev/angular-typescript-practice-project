import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
  id: string;
  read: boolean;  // Track if the notification is read
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>( [
    { message: 'Notification 1', type: 'success', id: '1', read: false },
    { message: 'Notification 2', type: 'error', id: '2', read: false },
    { message: 'Notification 3', type: 'info', id: '3', read: false },
    { message: 'Notification 3', type: 'info', id: '4', read: false },
    { message: 'Notification 3', type: 'info', id: '6', read: false },
    { message: 'Notification 3', type: 'info', id: '7', read: false },
    { message: 'Notification 3', type: 'info', id: '8', read: false },
    { message: 'Notification 3', type: 'info', id: '9', read: false },
    { message: 'Notification 3', type: 'info', id: '10', read: false },
  ]);
  notifications$ = this.notificationsSubject.asObservable();

  addNotification(message: string, type: 'success' | 'error' | 'info') {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: Notification = { message, type, id, read: false };
    this.notificationsSubject.next([...this.notificationsSubject.value, notification]);
  }

  removeNotification(id: string) {
    this.notificationsSubject.next(
      this.notificationsSubject.value.filter(notification => notification.id !== id)
    );
  }

  markAsRead(id: string) {
    const updatedNotifications = this.notificationsSubject.value.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    this.notificationsSubject.next(updatedNotifications);
  }
}
