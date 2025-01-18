import TasklistInterface from 'interfaces/tasklist';
import TaskList from '../models/tasklist';
import User from '../models/user';
import { TasklistWithUserInterface } from 'interfaces/tasklistWithUser';
import { UniqueConstraintError } from 'sequelize';

class TaskListService {
  async createTaskList(name: string, creatorId: number, slug: string) {
    try {
      const taskList = await TaskList.create({ name, creatorId, slug });
      return taskList;
    } catch (error) {
      if(error instanceof UniqueConstraintError){
        throw new Error(`Task is already present with ${name} name`);
      }else{
        throw new Error('Error creating task list: ' + error);
      }
    }
  }

  async getAllTaskLists(userId: number) {
    try {
      const taskLists = await TaskList.findAll({
        where: { creatorId: userId },
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'firstName', 'lastName']
        }]
      });
      return taskLists;
    } catch (error) {
      throw new Error('Error fetching task lists: ' + error);
    }
  }

  mapTasklistWithUserData(tasklist: any) {
    console.log(tasklist);
  }

  async getTaskListById(taskListId: number): Promise<any> {
    try {
      const taskList = await TaskList.findByPk(taskListId, {
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'firstName', 'lastName']
        }]
      });
      console.log(taskList);
      if (!taskList) throw new Error('Task list not found');
      return taskList;
    } catch (error) {
      throw new Error('Error fetching task list: ' + error);
    }
  }

  async updateTaskList(taskListId: number, name: string, userId: number) {
    try {
      const taskList = await TaskList.findByPk(taskListId);
      if (!taskList) throw new Error('Task list not found');
      if (userId !== Number(taskList.userId)) throw new Error('You aren\'t the creator of this Task.');

      taskList.name = name;
      await taskList.save();
      return taskList;
    } catch (error) {
      throw new Error('Error updating task list: ' + error);
    }
  }

  async deleteTaskList(taskListId: number, userId: number) {
    try {
      const taskList = await TaskList.findByPk(taskListId);
      if (!taskList) throw new Error('Task list not found');
      if (userId !== Number(taskList.userId)) throw new Error('You aren\'t the creator of this Task.');

      await taskList.destroy();
      return { message: 'Task list deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting task list: ' + error);
    }
  }

  async findTaskListBySlug(slug: string) {
    return TaskList.findOne({ where: { slug } });
  }

}

export default new TaskListService();
