import Task from "../models/task";
import TaskUser from "../models/taskuser";
import User from "../models/user";

class TaskService {
  // Create a new Task
  async createTask(
    title: string,
    description: string,
    taskListId: number | undefined,
    deadline?: Date,
    completed?: boolean,
    slug?: string,
    creatorId?: number
  ) {
    try {
      const task = await Task.create({
        title,
        description,
        taskListId,
        completed,
        deadline,
        slug,
        creatorId
      });
      return task;
    } catch (error) {
      throw new Error("Error creating task: " + error);
    }
  }

  async getAllTasks(taskListId: number) {
    try {
      const tasks = await Task.findAll({ where: { taskListId }, order: [['createdAt', 'desc']], include: [
        {
          model: User,
          as: 'creator'
        },
        {
          model: User,
          as: 'users'
        }
      ] });
      return tasks;
    } catch (error) {
      throw new Error("Error fetching tasks: " + error);
    }
  }

  // Get task by ID
  async getTaskById(taskId: number) {
    try {
      const task = await Task.findByPk(taskId, {
        include: [{
          model: User,
          as: 'users'
        }]
      });
      if (!task) throw new Error("Task not found");
      return task;
    } catch (error) {
      throw new Error("Error fetching task: " + error);
    }
  }

  // Update task
  async updateTask(
    taskId: number,
    title: string,
    description: string,
    completed: boolean,
    deadline: Date
  ) {
    try {
      const task = await Task.findByPk(taskId);
      if (!task) throw new Error("Task not found");
      task.title = title;
      task.description = description;
      task.completed = completed;
      task.deadline = deadline;
      await task.save();
      return task;
    } catch (error) {
      throw new Error("Error updating task: " + error);
    }
  }

  // Delete task
  async deleteTask(taskId: number) {
    try {
      const task = await Task.findByPk(taskId);
      if (!task) throw new Error("Task not found");
      await task.destroy();
      return { message: "Task deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting task: " + error);
    }
  }

  async toggleTaskStatus(taskId: number): Promise<Task | null> {
    const task = await Task.findByPk(taskId);
    if (!task) return null;

    task.completed = !task.completed;
    await task.save();
    return task;
  }

  async findTaskBySlugAndTaskList(
    slug: string,
    taskListId: number | undefined
  ): Promise<Task | null> {
    try {
      const task = await Task.findOne({
        where: {
          slug,
          taskListId,
        },
      });
      return task;
    } catch (err) {
      throw new Error(("Error checking task slug: " + err) as string);
    }
  }

  async createTaskUser(userId: number, taskId: number) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} does not exist.`);
      }
      return await TaskUser.create({
        taskId,
        userId
      });
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError'){
        throw new Error('This member already added to this task.')
      }else{
        throw new Error(error as string);
      }
    }
  }
}

export default new TaskService();
