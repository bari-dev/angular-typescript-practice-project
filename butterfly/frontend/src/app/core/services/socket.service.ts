import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

const BASE_URL = 'http://localhost:3000'; // Replace with your backend URL

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket?: Socket;
  private userId?: number;
  private isSocketConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Track connection status

  constructor(private authService: AuthService) {
    this.userId = this.authService.getUser()?.id;

    if (!this.userId) {
      console.error('No userId found, cannot initialize socket');
      return;
    }

    this.initializeSocket();
  }

  private initializeSocket() {
    if (this.userId) {
      this.socket = io(BASE_URL, {
        query: { userId: this.userId },
        transports: ['websocket', 'polling'],
      });

      this.socket.on('connect', () => {
        console.log(`Socket connected for user ${this.userId}`);
        this.isSocketConnected.next(true);
      });

      this.socket.on('disconnect', () => {
        console.log(`Socket disconnected for user ${this.userId}`);
        this.isSocketConnected.next(false);
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        this.isSocketConnected.next(false);
      });
    }
  }

  getSocket(): Socket | undefined {
    return this.socket;
  }

  on(event: string, callback: any): void {
    if (this.socket && this.isSocketConnected.value) {
      this.socket.on(event, callback);
    } else {
      console.error('Socket is not connected or initialized.');
    }
  }

  emit(event: string, data: any): void {
    if (this.socket && this.isSocketConnected.value) {
      this.socket.emit(event, data);
    } else {
      console.error('Socket is not connected or initialized.');
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.isSocketConnected.next(false);
    }
  }

  isConnected(): boolean {
    return this.isSocketConnected.value;
  }
}
