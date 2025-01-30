import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationInterface } from '../../core/interfaces/notification.interface';
import { SocketService } from '../../core/services/socket.service';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private socket = this.socketService.getSocket();
  private notificationsSubject = new BehaviorSubject<NotificationInterface[]>(
    []
  );
  notifications$ = this.notificationsSubject.asObservable();

  constructor(
    private socketService: SocketService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.fetchNotifications();
    this.listenForNotifications();
  }

  fetchNotifications() {
    const userId = this.authService.getUser()?.id;

    if (userId) {
      this.http
        .get<{ notifications: NotificationInterface[] }>(
          `http://localhost:3000/api/v1/users/${userId}/notifications`
        )
        .subscribe(
          (response) => {
            const notifications = response.notifications;
            if (Array.isArray(notifications)) {
              this.notificationsSubject.next(notifications);
            } else {
              console.error(
                'API returned an invalid notifications array:',
                notifications
              );
            }
          },
          (error) => {
            console.error('Error fetching notifications:', error);
          }
        );
    }
  }

  private listenForNotifications() {
    this.socket?.on('notification', (notification: NotificationInterface) => {
      this.addNotification(notification);
    });
  }

  addNotification(notification: NotificationInterface) {
    this.notificationsSubject.next([
      ...this.notificationsSubject.value,
      notification,
    ]);
  }

  // Mark a notification as read
  markAsRead(id: string) {
    const updatedNotifications = this.notificationsSubject.value.map(
      (notification) =>
        notification.id === id ? { ...notification, read: true } : notification
    );
    this.notificationsSubject.next(updatedNotifications);
  }
}
