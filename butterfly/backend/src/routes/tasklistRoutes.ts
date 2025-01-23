import tasklistController from '../controllers/tasklistController';
import { Router } from 'express';
import taskRoutes from './tasksRoutes';
import tasklistMiddleware from '../middleware/tasklist';

const router = Router();

// Parent routes for TaskLists
router.get('/', tasklistController.getAllTaskLists);
router.get('/search', tasklistController.getFilterTasklist);
router.post('/:taskListSlug/addUser', tasklistController.addUserToTasklist);

router.get('/:taskListId', tasklistController.getTaskListById);
router.post('/', tasklistController.createTaskList);
router.put('/:taskListId', tasklistController.updateTaskList);
router.delete('/:taskListId', tasklistController.deleteTaskList);

// tasklist's tasks
router.use('/:taskListSlug/tasks', tasklistMiddleware, taskRoutes);

export default router;
