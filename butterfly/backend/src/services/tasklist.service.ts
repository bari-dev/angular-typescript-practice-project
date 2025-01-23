import TasklistInterface from "interfaces/tasklist";
import TaskList from "../models/tasklist";
import User from "../models/user";
import { TasklistWithUserInterface } from "interfaces/tasklistWithUser";
import { UniqueConstraintError } from "sequelize";
import TasklistMember from "../models/tasklistMembers";

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
      const taskLists = await TaskList.findAll({
        where: { creatorId: userId },
        include: [
          {
            model: User,
            as: "creator",
            attributes: ["id", "firstName", "lastName"],
          },
          {
            model: TasklistMember,
            as: 'tasklistMembers',
            attributes: ["id", "firstName", "lastName", "email"],
          }
        ],
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

  mapTasklistWithUserData(tasklist: any) {
    console.log(tasklist);
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
            model: TasklistMember,
            as: 'tasklistMembers',
            attributes: ["id", "firstName", "lastName", "email"],
          }
        ],
      });
      console.log(taskList);
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
    return TaskList.findOne({ where: { slug }, include: [{ model: User, as: 'users' }] });
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

      const TasklistMembers = await TasklistMember.findAll({
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
  
      return TasklistMembers;
    } catch (err) {
      throw new Error("Error adding user to task list: " + err);
    }
  }
}

export default new TaskListService();
