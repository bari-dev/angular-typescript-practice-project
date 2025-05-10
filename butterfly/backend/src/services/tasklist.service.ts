import TasklistInterface from "interfaces/tasklist";
import TaskList from "../models/tasklist";
import User from "../models/user";
import { TasklistWithUserInterface } from "interfaces/tasklistWithUser";
import { Op, UniqueConstraintError } from "sequelize";
import TasklistMember from "../models/tasklistMembers";
import Task from "../models/task";
import TaskInterface from "../interfaces/task";

class TaskListService {
  async createTaskList(name: string, creatorId: number, slug: string) {
    try {
      const taskList = await TaskList.create({ name, creatorId, slug });

      await TasklistMember.create({
        tasklistId: taskList.id,
        memberId: creatorId
      });

      return taskList;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new Error(`Task is already present with ${name} name`);
      } else {
        throw new Error("Error creating task list: " + error);
      }
    }
  }

  async getAllTaskLists(userId: number, page: number, pageSize: number) {
    try {
      let tasklistMember = await TasklistMember.findAll({where: { memberId: userId }})
      const taskLists = await TaskList.findAll({
        where: { id: tasklistMember.map(data=>data.tasklistId) },
        include: [
          {
            model: User,
            as: "creator",
            attributes: ["id", "firstName", "lastName"],
          },
          {
            model: User,
            as: 'users',
            attributes: ["id", "firstName", "lastName", "email"],
          }
        ],
        order: [["createdAt", "desc"]],
        offset: (page - 1) * pageSize,
        limit: pageSize,
      });
      return taskLists;
    } catch (error) {
      throw new Error("Error fetching task lists: " + error);
    }
  }

  async getTaskListCount(userId: number) {
    return TasklistMember.count({ where: { memberId: userId } });
  }

  async getTaskListById(taskListId: number): Promise<any> {
    try {
      const taskList = await TaskList.findByPk(taskListId, {
        include: [
          {
            model: User,
            as: "creator",
            attributes: ["id", "firstName", "lastName"],
          },
          {
            model: User,
            as: 'users',
            attributes: ["id", "firstName", "lastName", "email"],
          }
        ],
      });
      if (!taskList) throw new Error("Task list not found");
      return taskList;
    } catch (error) {
      throw new Error("Error fetching task list: " + error);
    }
  }

  async updateTaskList(taskListId: number, name: string, userId: number) {
    try {
      const taskList = await TaskList.findByPk(taskListId);
      if (!taskList) throw new Error("Task list not found");
      if (userId !== Number(taskList.creatorId))
        throw new Error("You aren't the creator of this Task.");

      taskList.name = name;
      await taskList.save();
      return taskList;
    } catch (error) {
      throw new Error("Error updating task list: " + error);
    }
  }

  async deleteTaskList(taskListId: number, userId: number) {
    try {
      const taskList = await TaskList.findByPk(taskListId);
      if (!taskList) throw new Error("Task list not found");
      if (userId !== Number(taskList.creatorId))
        throw new Error("You aren't the creator of this Task.");

      await taskList.destroy();
      return { message: "Task list deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting task list: " + error);
    }
  }

  async findTaskListBySlug(slug: string) {
    return await TaskList.findOne({ where: { slug }, include: [{
        model: User,
        as: "creator",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: TasklistMember,
        as: 'tasklistMembers'
      }] 
    });
  }

  async addUserToTasklist(
    taskListId: number,
    userId: number
  ): Promise<TasklistMember[] | null> {
    try {
      const existingMember = await TasklistMember.findOne({
        where: {
          tasklistId: taskListId,
          memberId: userId
        }
      });
  
      if (existingMember) throw 'User is already a member of this task list';
  
      await TasklistMember.create({
        tasklistId: taskListId,
        memberId: userId,
      });

  
      return this.getAllTaskListMembers(taskListId, userId);
    } catch (err) {
      throw new Error("Error adding user to task list: " + err);
    }
  }

  private async getAllTaskListMembers(taskListId: number, userId: number): Promise<TasklistMember[]> {
    return await TasklistMember.findAll({
      where: {
        tasklistId: taskListId,
        memberId: userId
      },
      include: [
        {
          model: TaskList,
          as: 'tasklist'
        },
        {
          model: User,
          as: 'member'
        }
      ]
    });
  }

  async removeUserFromTasklist(userId: number, taskListId: number) {
    try {
      const taskListMember = await TasklistMember.findOne({
        where: {
          memberId: userId,
          tasklistId: taskListId
        }
      });
      if (!taskListMember) throw new Error('Tasklist member not found');
      await taskListMember.destroy();
      return taskListMember;
    } catch (error) {
      throw new Error("Error removing user from task list: " + error);
    }
  }

  async getAllCompletedTaskLists(userId: number, page: number, pageSize: number) {
    return TaskList.findAll({
      where: { creatorId: userId },
      include: [
        { model: User, as: 'users' },
        { model: Task, as: 'tasks', where: { completed: 1 } },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
  }

  async getCompletedTaskListCount(userId: number) {
    return TaskList.count({
      where: { creatorId: userId },
      include: [
        { model: Task, as: 'tasks', where: { completed: 1 } },
      ],
    });
  }

  async getAllIncompleteTaskLists(userId: number, page: number, pageSize: number) {
    return TaskList.findAll({
      where: { creatorId: userId },
      include: [
        { model: User, as: 'users' },
        { model: Task, as: 'tasks', where: { completed: 0 } },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
  }

  async getIncompleteTaskListCount(userId: number) {
    return TaskList.count({
      where: { creatorId: userId },
      include: [
        { model: Task, as: 'tasks', where: { completed: 0 } },
      ],
    });
  }

  async getAllPastDueTaskLists(userId: number, page: number, pageSize: number) {
    return TaskList.findAll({
      where: {
        creatorId: userId,
      },
      include: [
        { model: User, as: 'users' },
        { model: Task, as: 'tasks', where: {
          deadline: { [Op.lt]: new Date() }
        } },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
  }

  async getPastDueTaskListCount(userId: number) {
    return TaskList.count({
      where: {
        creatorId: userId,
      },
      include: [
        { model: Task, as: 'tasks', where: {
          deadline: { [Op.lt]: new Date() }
        }},
      ],
    });
  }

  async getAllUserCountByUser(userId: number) {
    return TaskList.count({ where: { creatorId: userId } });
  }
}

export default new TaskListService();
