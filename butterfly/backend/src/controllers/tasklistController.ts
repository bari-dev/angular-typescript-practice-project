import { Request, Response } from 'express';
import TaskListService from '../services/tasklist.service';
import TasklistInterface from '../interfaces/tasklist';
import sequelizeConnection from '../config/database';
import { QueryTypes } from 'sequelize';
import tasklistService from '../services/tasklist.service';
import User from '../models/user';
import Joi from 'joi';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

class TaskListController {
  async createTaskList(req: Request, res: Response): Promise<void> {
    const name = req.body.name;
    const creatorId = req.user?.id;
  
    try {
      let slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  
      let existingTaskList = await TaskListService.findTaskListBySlug(slug);
      
      while (existingTaskList) {
        const randomSuffix = Math.floor(10000 + Math.random() * 99999);
        slug = `${slug}-${randomSuffix}`;
  
        existingTaskList = await TaskListService.findTaskListBySlug(slug);
      }
    
      const taskList = await TaskListService.createTaskList(name, Number(creatorId), slug);
  
      res.status(201).json(taskList);
      return;
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  async getAllTaskLists(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5; 
    const filter = req.query.filterOption as string || 'all';
    
    try {
      let taskLists;
      let totalTaskLists;
  
      if (filter === 'incompleted') {
        taskLists = await TaskListService.getAllIncompleteTaskLists(Number(userId), page, pageSize);
        totalTaskLists = await TaskListService.getIncompleteTaskListCount(Number(userId));
      } else if (filter === 'completed') {
        taskLists = await TaskListService.getAllCompletedTaskLists(Number(userId), page, pageSize);
        totalTaskLists = await TaskListService.getCompletedTaskListCount(Number(userId));
        
      } else if (filter === 'past_due') {
        taskLists = await TaskListService.getAllPastDueTaskLists(Number(userId), page, pageSize);
        totalTaskLists = await TaskListService.getPastDueTaskListCount(Number(userId));
        
      } else if (filter === 'all') {
        taskLists = await TaskListService.getAllTaskLists(Number(userId), page, pageSize);
        totalTaskLists = await TaskListService.getTaskListCount(Number(userId));
      }
  
      res.status(200).json({
        taskLists,
        totalTaskLists,
        page,
        pageSize
      });
  
    } catch (err) {
      res.status(500).json({ message: String(err) });
    }
  }
  

  async getTaskListById(req: Request, res: Response): Promise<void> {
    const { taskListId } = req.params;
    console.log(taskListId);
    try {
      const taskList = await TaskListService.getTaskListById(Number(taskListId));
      res.status(200).json(taskList);
      return 
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  async updateTaskList(req: Request, res: Response): Promise<void> {
    const { taskListId } = req.params;
    const { name } = req.body;
    const userId   = req.user?.id;
    try {
      const updatedTaskList = await TaskListService.updateTaskList(Number(taskListId), name, Number(userId));
      res.status(200).json(updatedTaskList);
      return
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  async deleteTaskList(req: Request, res: Response): Promise<void> {
    const { taskListId } = req.params;
    const userId   = req.user?.id;
    try {
      const result = await TaskListService.deleteTaskList(Number(taskListId), Number(userId));
      res.status(200).json(result);
      return
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  async getFilterTasklist(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { filter } = req.query;
  
    if (!userId) {
      res.status(400).json({ message: "User not authenticated" });
      return;
    }
  
    try {
      let query = `
        SELECT tasklists.*, creator.*
        FROM TaskList AS tasklists
        JOIN Task ON tasklists.id = Task.tasklistId
        JOIN tasklistMember AS tasklistMembers ON tasklists.id = tasklistMembers.tasklistId
        JOIN User as creator on tasklists.creatorId = creator.id
        WHERE tasklistMembers.memberId = :userId`;
  
      if (filter) {
        if (filter === 'incomplete') {
          query += ' AND Task.completed = false';
        } else if (filter === 'complete') {
          query += ' AND Task.completed = true';
        } else if (filter === 'past_due') {
          query += ' AND Task.deadline < NOW() AND Task.completed = false';
        }
      }
  
      query += ' ORDER BY tasklists.createdAt DESC';
  
      const [results, metadata] = await sequelizeConnection.query(query, {
        replacements: { userId },
        type: QueryTypes.SELECT,
      });
  
      res.status(200).json(results || {});
      return;
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }


  async addUserToTasklist(req: Request, res: Response): Promise<void> {
    const loginSchema = Joi.object({
      userEmail: Joi.string()
        .pattern(emailRegex)
        .required()
        .messages({
          'string.empty': 'User Email is required.',
          'string.pattern.base': 'Kindly provide a valid email address.',
        }),
    });

    const { error } = loginSchema.validate(req.query);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return 
    }
  
    const tasklistSlug = req.params.taskListSlug;
    const userEmail = req.query.userEmail;
    
    try {
      const tasklist = await tasklistService.findTaskListBySlug(tasklistSlug);
      const currentUser = req.user

      if(tasklist?.creatorId !== currentUser?.id) {
        res.status(400).json({ message: 'You are not the creator of this task.' });
        return 
      }

      const user = await User.findOne({where: { email: userEmail }})
  
      if (!user) {
        res.status(400).json({ message: 'User not found in system' });
        return;
      }

      const taskListMembers = await TaskListService.addUserToTasklist(Number(tasklist?.id), Number(user.id));

      if (!taskListMembers) {
        res.status(404).json({ message: 'Tasklist not found or user could not be added.' });
        return;
      }

      res.status(200).json({ message: 'User added to task list successfully.', taskListMembers });
      return;
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }
}

export default new TaskListController();
