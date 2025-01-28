import { Request, Response } from "express";
import TaskService from "../services/task.service";

class TaskController {
  async createTask(req: Request, res: Response): Promise<void> {
    const { title, description, tasklistSlug, deadline, completed } =
      req.body.input;
    try {
      if (tasklistSlug !== req.tasklist?.slug)
        throw new Error("Invalid request.");
      let taskSlug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      let existingTask = await TaskService.findTaskBySlugAndTaskList(
        taskSlug,
        req.tasklist?.id
      );
      while (existingTask) {
        const randomSuffix = Math.floor(10000 + Math.random() * 99999);
        taskSlug = `${taskSlug}-${randomSuffix}`;
        existingTask = await TaskService.findTaskBySlugAndTaskList(
          taskSlug,
          req.tasklist?.id
        );
      }
      const task = await TaskService.createTask(
        title,
        description,
        req.tasklist?.id,
        deadline,
        completed,
        taskSlug,
        req?.user?.id
      );
      res.status(201).json(task);
      return;
    } catch (err) {
      res.status(500).json({ message: String(err) });
      return;
    }
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    const tasklistId = req.tasklist?.id;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const filter = req.query.filter ?? "all";

    try {
      let tasks;
      let totalTasks;

      if (filter === "incompleted") {
        tasks = await TaskService.getAllIncompletedTasks(
          Number(tasklistId),
          page,
          pageSize
        );
        totalTasks = await TaskService.getAllIncompletedTasksCount(
          Number(tasklistId)
        );
      } else if (filter === "completed") {
        tasks = await TaskService.getAllCompletedTasks(
          Number(tasklistId),
          page,
          pageSize
        );
        totalTasks = await TaskService.getAllCompletedTasksCount(
          Number(tasklistId)
        );
      } else if (filter === "past_due") {
        tasks = await TaskService.getAllPastDueTasks(
          Number(tasklistId),
          page,
          pageSize
        );
        totalTasks = await TaskService.getAllPastDueTasksCount(
          Number(tasklistId)
        );
      } else if(filter === 'all') {
        tasks = await TaskService.getAllTasks(
          Number(tasklistId),
          page,
          pageSize
        );
        totalTasks = await TaskService.getAllTasksCount(Number(tasklistId));
      }

      res.status(200).json({
        tasks,
        totalTasks,
        page,
        pageSize,
      });
    } catch (err) {
      res.status(500).json({ message: String(err) });
    }
  }

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

  async updateTask(req: Request, res: Response): Promise<void> {
    const { taskId } = req.params;
    const { title, description, completed, deadline } = req.body.task;
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

  async addUserToTask(req: Request, res: Response): Promise<void> {
    const { memberId } = req.query;
    const { taskId } = req.params;
    const tasklist = req.tasklist;

    try {
      const existingMember = tasklist?.tasklistMembers?.find(
        (mbr) => mbr.id === memberId
      );

      if (existingMember !== undefined) {
        throw new Error("Member not found in tasklist.");
      }

      let task = await TaskService.getTaskById(Number(taskId));
      if (!task) {
        throw new Error("Task not found.");
      }

      await TaskService.createTaskUser(Number(memberId), Number(taskId));
      task = await TaskService.getTaskById(Number(taskId));
      res.status(200).json(task);
    } catch (err) {
      res
        .status(500)
        .json({ message: err instanceof Error ? err.message : String(err) });
      return;
    }
  }
}

export default new TaskController();
