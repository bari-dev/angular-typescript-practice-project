import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationInterface } from '../../core/interfaces/notification.interface';
import { SocketService } from '../../core/services/socket.service';
import { AuthService } from '../../core/services/auth.service';
import { env } from 'src/environments/environment';

const BASE_URL = env.apiBaseUrl;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private socket = this.socketService.getSocket();
  private notificationsSubject = new BehaviorSubject<NotificationInterface[]>([]);
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
          `${BASE_URL}/users/${userId}/notifications`
        )
        .subscribe(
          (response) => {
            const notifications = response.notifications;
            if (Array.isArray(notifications)) {
              this.notificationsSubject.next(notifications);
            } else {
              console.error('API returned an invalid notifications array:', notifications);
            }
          },
          (error) => {
            console.error('Error fetching notifications:', error);
          }
        );
    }
  }

  markAllAsRead() {
    const userId = this.authService.getUser()?.id;

    if (userId) {
      this.http
        .put(`${BASE_URL}/users/${userId}/notifications/markAllRead`, {})
        .subscribe(
          () => {
            const updatedNotifications = this.notificationsSubject.value.map(
              (notification) => ({ ...notification, read: true })
            );
            this.notificationsSubject.next(updatedNotifications);
          },
          (error) => {
            console.error('Error marking all notifications as read:', error);
          }
        );
    }
  }

  // Mark a single notification as read
  markRead(id: string) {
    const userId = this.authService.getUser()?.id;

    if (userId) {
      this.http
        .put(`${BASE_URL}/users/${userId}/notifications/${id}/markAsRead`, {})
        .subscribe(
          () => {
            const updatedNotifications = this.notificationsSubject.value.map(
              (notification) =>
                notification.id === id ? { ...notification, read: true } : notification
            );
            this.notificationsSubject.next(updatedNotifications);
          },
          (error) => {
            console.error('Error marking notification as read:', error);
          }
        );
    }
  }

  private listenForNotifications() {
    this.socket?.on('notification', (notification: NotificationInterface) => {
      this.addNotification(notification);
    });
  }

  private addNotification(notification: NotificationInterface) {
    this.notificationsSubject.next([
      ...this.notificationsSubject.value,
      notification,
    ]);
  }

  private handleSocketErrors() {
    this.socket?.on('connect_error', (err: any) => {
      console.error('WebSocket connection error:', err);
    });
    this.socket?.on('disconnect', () => {
      console.warn('WebSocket disconnected');
    });
  }
}
