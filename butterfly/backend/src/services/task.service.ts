import Task from '../models/task';

class TaskService {
  // Create a new Task
  async createTask(title: string, description: string, taskListId: number, assignedToUserId: number, deadline?: Date) {
    try {
      const task = await Task.create({ title, description, taskListId, assignedToUserId, deadline });
      return task;
    } catch (error) {
      throw new Error('Error creating task: ' + error);
    }
  }

  // Get all tasks for a task list
  async getAllTasks(taskListId: number) {
    try {
      const tasks = await Task.findAll({ where: { taskListId } });
      return tasks;
    } catch (error) {
      throw new Error('Error fetching tasks: ' + error);
    }
  }

  // Get task by ID
  async getTaskById(taskId: number) {
    try {
      const task = await Task.findByPk(taskId);
      if (!task) throw new Error('Task not found');
      return task;
    } catch (error) {
      throw new Error('Error fetching task: ' + error);
    }
  }

  // Update task
  async updateTask(taskId: number, title: string, description: string, completed: boolean, deadline: Date) {
    try {
      const task = await Task.findByPk(taskId);
      if (!task) throw new Error('Task not found');
      task.title = title;
      task.description = description;
      task.completed = completed;
      task.deadline = deadline;
      await task.save();
      return task;
    } catch (error) {
      throw new Error('Error updating task: ' + error);
    }
  }

  // Delete task
  async deleteTask(taskId: number) {
    try {
      const task = await Task.findByPk(taskId);
      if (!task) throw new Error('Task not found');
      await task.destroy();
      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting task: ' + error);
    }
  }

  async toggleTaskStatus(taskId: number): Promise<Task | null> {
    const task = await Task.findByPk(taskId);
    if (!task) return null;

    task.completed = !task.completed;
    await task.save();
    return task;
  }
}

export default new TaskService();
