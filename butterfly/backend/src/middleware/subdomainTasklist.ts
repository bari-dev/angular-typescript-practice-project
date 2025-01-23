import { NextFunction, Request, Response } from 'express';
import TasklistInterface from 'interfaces/tasklist';
import tasklistService from '../services/tasklist.service';

declare global {
  namespace Express {
    export interface Request {
      tasklist?: TasklistInterface;
    }
  }
}

const subdomainTasklistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { taskListSlug } = req.params;
  console.log(taskListSlug)
  try {
    const taskList = await tasklistService.findTaskListBySlug(taskListSlug)
    if (!taskList) {
      res.status(404).json({ error: 'TaskList not found' });
      return;
    }

    req.tasklist = taskList;
    next();
  } catch (error) {
    res.status(500).json({ error: String(error) });
    return
  }
};

export default subdomainTasklistMiddleware;