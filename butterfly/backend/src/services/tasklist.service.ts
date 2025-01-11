import TaskList from '../models/tasklist';

class TaskListService {
  // Create a new TaskList
  async createTaskList(name: string, userId: number) {
    try {
      console.error(name, userId)
      const taskList = await TaskList.create({ name, userId });
      return taskList;
    } catch (error) {
      throw new Error('Error creating task list: ' + error);
    }
  }

  // Get all task lists for a user
  async getAllTaskLists(userId: number) {
    try {
      const taskLists = await TaskList.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
      return taskLists;
    } catch (error) {
      throw new Error('Error fetching task lists: ' + error);
    }
  }

  // Get a task list by ID
  async getTaskListById(taskListId: number) {
    try {
      const taskList = await TaskList.findByPk(taskListId);
      if (!taskList) throw new Error('Task list not found');
      return taskList;
    } catch (error) {
      throw new Error('Error fetching task list: ' + error);
    }
  }

  // Update a task list
  async updateTaskList(taskListId: number, name: string, userId: number) {
    try {
      const taskList = await TaskList.findByPk(taskListId);
      if (!taskList) throw new Error('Task list not found');
      if(userId !== Number(taskList.userId)) throw new Error('You aren\'t the creator of this Task.');

      taskList.name = name;
      await taskList.save();
      return taskList;
    } catch (error) {
      throw new Error('Error updating task list: ' + error);
    }
  }

  // Delete a task list
  async deleteTaskList(taskListId: number, userId: number) {
    try {
      const taskList = await TaskList.findByPk(taskListId);
      if (!taskList) throw new Error('Task list not found');
      if(userId !== Number(taskList.userId)) throw new Error('You aren\'t the creator of this Task.');

      await taskList.destroy();
      return { message: 'Task list deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting task list: ' + error);
    }
  }
}

export default new TaskListService();
