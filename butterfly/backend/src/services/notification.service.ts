import TaskInterface from "../interfaces/task";
import TasklistInterface from "../interfaces/tasklist";
import UserInterface from "../interfaces/user";
import Notification from "../models/notification";
import { socketIo } from "../server";

class NotificationService {
  async markAsRead(notificationId: number, userId: number) {
    await Notification.update({ read: true }, { where: { id: notificationId, userId } });
  }

  async createNotificationForTasklist(tasklist: TasklistInterface | null, fromUser: UserInterface | undefined, toUser: UserInterface) {
    if (!tasklist || !fromUser) return;

    const notificationData = {
      userId: toUser.id,
      title: 'Tasklist Assigned',
      description: `${fromUser.firstName} ${fromUser.lastName} added you to the tasklist: ${tasklist.name}`,
      type: 'info',
      read: false,
    };

    const notification = await this.createNotification(notificationData);

    socketIo.to(`userId:${toUser.id}`).emit('notification', {
      ...notificationData,
      id: notification.id
    });
  }

  async createNotificationForTask(task: TaskInterface, fromUser: UserInterface, toUser: UserInterface) {
    const notificationData = {
      userId: toUser.id,
      title: 'Task Assigned',
      description: `${fromUser.firstName} ${fromUser.lastName} added you to the task: ${task.title}`,
      type: 'info',
      read: false,
    };

    const notification = await this.createNotification(notificationData);

    // Emit the notification to the specific user
    socketIo.to('notification').emit('notification', {
      ...notificationData,
      id: notification.id // Ensure the notification id is sent
    });
  }

  async markAllAsRead(userId: number) {
    await Notification.update({ read: true }, { where: { userId } });
  }

  private async createNotification(obj: any) {
    const notification = await Notification.create(obj);
    return notification;
  }
}

export default new NotificationService();
