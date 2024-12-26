import { Request, Response } from 'express';
import TaskListService from '../services/tasklist.service';

class TaskListController {
  // Create Task List
  async createTaskList(req: Request, res: Response): Promise<void> {
    const name = req.body.name;
    const userId = req.user?.id;
    try {
      const taskList = await TaskListService.createTaskList(name, Number(userId));
      res.status(201).json(taskList);
      return 
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  // Get all Task Lists for a user
  async getAllTaskLists(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    try {
      console.log(userId)
      const taskLists = await TaskListService.getAllTaskLists(Number(userId));
      res.status(200).json(taskLists);
      return 
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  // Get Task List by ID
  async getTaskListById(req: Request, res: Response): Promise<void> {
    const { taskListId } = req.params;
    try {
      const taskList = await TaskListService.getTaskListById(Number(taskListId));
      res.status(200).json(taskList);
      return 
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  // Update Task List
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

  // Delete Task List
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
}

export default new TaskListController();
