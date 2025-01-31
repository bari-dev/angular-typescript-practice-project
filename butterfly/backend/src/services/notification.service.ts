import TaskInterface from "../interfaces/task";
import TasklistInterface from "../interfaces/tasklist";
import UserInterface from "../interfaces/user";
import Notification from "../models/notification";

class NotificationService {
  async markAsRead(notificationId: number) {
    await Notification.update({ read: true }, { where: { id: notificationId } });
  }

  createNotificationForTasklist(tasklist: TasklistInterface | null, fromUser: UserInterface | undefined, toUser: UserInterface) {
    if(!tasklist || !fromUser) return

    this.createNotification({
      userId: toUser.id,
      title: 'Tasklist Assigned',
      description: `${fromUser?.firstName} ${fromUser?.lastName} add you to the tasklist: ${tasklist?.name}`,
      type: 'info',
      read: false,
    })
  }

  createNotificationForTask(task: TaskInterface, fromUser: UserInterface, toUser: UserInterface) {
    this.createNotification({
      userId: toUser.id,
      title: 'Task Assigned',
      description: `${fromUser.firstName} ${fromUser.lastName} add you to the task: ${task.title}`,
      type: 'info',
      read: false,
    })
  }

  async markAllAsRead(userId: number) {
    await Notification.update({ read: true }, { where: { userId } });
  }

  private async createNotification(obj: any) {
    await Notification.create(obj);
  }
}

export default new NotificationService();
