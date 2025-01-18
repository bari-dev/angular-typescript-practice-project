import { Request, Response } from 'express';
import TaskListService from '../services/tasklist.service';

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
    try {
      const taskLists = await TaskListService.getAllTaskLists(Number(userId));
      res.status(200).json(taskLists);
      return 
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

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
}

export default new TaskListController();
