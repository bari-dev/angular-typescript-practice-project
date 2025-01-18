import { Request, Response } from "express";
import TaskService from "../services/task.service";

class TaskController {
  // Create Task
  async createTask(req: Request, res: Response): Promise<void> {
    const { title, description, tasklistSlug, assignedToUserId, deadline, completed } = req.body.input;

    try {
      if(tasklistSlug !== req.tasklist?.slug) throw new Error('Invalid request.')
      // Ensure the task title is unique, if applicable

      let taskSlug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

      // Check if a task with the same slug already exists in the task list (optional)
      let existingTask = await TaskService.findTaskBySlugAndTaskList(
        taskSlug,
        req.tasklist?.id
      );

      // If a task with the same slug exists, append a random suffix to make it unique
      while (existingTask) {
        const randomSuffix = Math.floor(10000 + Math.random() * 99999);
        taskSlug = `${taskSlug}-${randomSuffix}`;
        existingTask = await TaskService.findTaskBySlugAndTaskList(
          taskSlug,
          req.tasklist?.id
        );
      }

      // Create the task using the provided details
      const task = await TaskService.createTask(
        title,
        description,
        req.tasklist?.id,
        deadline,
        completed,
        taskSlug,
        req?.user?.id
      );

      // Return the created task as a response
      res.status(201).json(task);
      return;
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  // Get all Tasks in a Task List
  async getAllTasks(req: Request, res: Response): Promise<void> {
    const tasklist = req.tasklist;
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
      const updatedTask = await TaskService.updateTask(
        Number(taskId),
        title,
        description,
        completed,
        deadline
      );
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
        res.status(404).json({ message: "Task not found" });
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
