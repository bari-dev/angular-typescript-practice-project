export interface NotificationInterface {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'error' | 'info';
  read: boolean;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}
