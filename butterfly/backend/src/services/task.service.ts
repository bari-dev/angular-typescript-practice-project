import { Op } from "sequelize";
import Task from "../models/task";
import TaskList from "../models/tasklist";
import TaskUser from "../models/taskuser";
import User from "../models/user";

class TaskService {
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
        creatorId,
      });
      return task;
    } catch (error) {
      throw new Error("Error creating task: " + error);
    }
  }

  async getTaskById(taskId: number) {
    try {
      const task = await Task.findByPk(taskId, {
        include: [
          {
            model: User,
            as: "creator",
          },
          {
            model: User,
            as: "users",
          },
        ],
      });
      if (!task) throw new Error("Task not found");
      return task;
    } catch (error) {
      throw new Error("Error fetching task: " + error);
    }
  }

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

  async findTaskByTitleAndTasklist(
    title: string,
    taskListId: number | undefined
  ): Promise<Task | null> {
    try {
      const task = await Task.findOne({
        where: {
          title,
          taskListId,
        },
      });
      return task;
    } catch (err) {
      throw new Error(("Error checking task slug: " + err) as string);
    }
  }

  async findTaskBySlug(
    slug: string,
  ): Promise<Task | null> {
    try {
      const task = await Task.findOne({
        where: {
          slug,
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
        userId,
      });
    } catch (error: any) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new Error("This member already added to this task.");
      } else {
        throw new Error(error as string);
      }
    }
  }

  async removeTaskUser(userId: number, taskId: number) {
    try {
      const taskUser = await TaskUser.findOne({
        where: { userId, taskId },
      });
      if (!taskUser) {
        throw new Error("User not found in task.");
      }
      await taskUser.destroy();
      return taskUser;
    } catch (error: any) {
      throw new Error(error as string);
    }
  }

  async getAllTasks(id: number, page: number, pageSize: number) {
    try {
      const tasks = await Task.findAll({
        where: { taskListId: id },
        include: [
          {
            model: User,
            as: "creator",
            attributes: ["id", "firstName", "lastName", "email"],
          },
          {
            model: User,
            as: "users",
            attributes: ["id", "firstName", "lastName", "email"],
          }
        ],
        order: [["createdAt", "desc"]],
        limit: pageSize,
        offset: (page - 1) * pageSize,
        attributes: {
          exclude: ["taskListId"]
        }
      });
      return tasks;
    } catch (error: any) {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }
  }

  async getAllCompletedTasks(
    taskListId: number,
    page: number,
    pageSize: number
  ) {
    return await Task.findAll({
      where: { taskListId, completed: 1 },
      order: [["createdAt", "desc"]],
      include: [
        { model: User, as: "creator" },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
  }

  async getAllIncompletedTasks(
    taskListId: number,
    page: number,
    pageSize: number
  ) {
    return Task.findAll({
      where: { taskListId, completed: 0 },
      order: [["createdAt", "desc"]],
      include: [
        { model: User, as: "creator" },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
  }

  async getAllPastDueTasks(taskListId: number, page: number, pageSize: number) {
    return Task.findAll({
      where: { taskListId, deadline: { [Op.lt]: new Date() } },
      order: [["createdAt", "desc"]],
      include: [
        { model: User, as: "creator" },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
  }

  async getAllTasksCount(taskListId: number) {
    try {
      const tasks = await Task.count({
        where: { taskListId },
        include: [
          {
            model: User,
            as: "creator",
          }
        ],
      });
      return tasks;
    } catch (error: any) {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }
  }

  async getAllCompletedTasksCount(taskListId: number) {
    return Task.count({
      where: { taskListId, completed: 1 },
      include: [
        { model: User, as: "creator" },
      ],
    });
  }

  async getAllIncompletedTasksCount(taskListId: number) {
    return Task.count({
      where: { taskListId, completed: 0 },
      include: [
        { model: User, as: "creator" },
      ],
    });
  }

  async getAllPastDueTasksCount(taskListId: number) {
    return Task.count({
      where: { taskListId, deadline: { [Op.lt]: new Date() } },
      include: [
        { model: User, as: "creator" },
      ],
    });
  }

  async getTasksCountByUser(userId: number) {
    return TaskUser.count({ where: { userId } });
  }
}

export default new TaskService();
