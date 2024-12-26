import { Request, Response } from 'express';
import TaskService from '../services/task.service';

class TaskController {
  // Create Task
  async createTask(req: Request, res: Response): Promise<void> {
    const { title, description, taskListId, assignedToUserId, deadline } = req.body;
    try {
      const task = await TaskService.createTask(title, description, taskListId, assignedToUserId, deadline);
      res.status(201).json(task);
      return;
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  // Get all Tasks in a Task List
  async getAllTasks(req: Request, res: Response): Promise<void> {
    const tasklist = req.tasklist 
    try {
      const tasks = await TaskService.getAllTasks(Number(tasklist?.id));
      res.status(200).json(tasks);
      return;
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  // Get Task by ID
  async getTaskById(req: Request, res: Response): Promise<void> {
    const { taskId } = req.params;
    try {
      const task = await TaskService.getTaskById(Number(taskId));
      res.status(200).json(task);
      return;
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  // Update Task
  async updateTask(req: Request, res: Response): Promise<void> {
    const { taskId } = req.params;
    const { title, description, completed, deadline } = req.body;
    try {
      const updatedTask = await TaskService.updateTask(Number(taskId), title, description, completed, deadline);
      res.status(200).json(updatedTask);
      return;
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  // Delete Task
  async deleteTask(req: Request, res: Response): Promise<void> {
    const { taskId } = req.params;
    try {
      const result = await TaskService.deleteTask(Number(taskId));
      res.status(200).json(result);
      return;
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  // Toggle Task Status
  async updateStatus(req: Request, res: Response): Promise<void> {
    const { taskId } = req.params;

    try {
      const updatedTask = await TaskService.toggleTaskStatus(Number(taskId));
      if (!updatedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }
}

export default new TaskController();
