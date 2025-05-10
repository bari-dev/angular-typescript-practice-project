import tasklistController from '../controllers/tasklistController';
import { Router } from 'express';
import taskRoutes from './tasksRoutes';
import subdomainTasklistMiddleware from '../middleware/subdomainTasklist';

const router = Router();

// Parent routes for TaskLists
router.get('/', tasklistController.getAllTaskLists);
router.get('/search', tasklistController.getFilterTasklist);
router.post('/:taskListSlug/addUser', tasklistController.addUserToTasklist);
router.delete('/:taskListSlug/removeUser', tasklistController.removeUserFromTasklist);

router.get('/:taskListId', tasklistController.getTaskListById);
router.post('/', tasklistController.createTaskList);
router.put('/:taskListId', tasklistController.updateTaskList);
router.delete('/:taskListId', tasklistController.deleteTaskList);

// tasklist's tasks
router.use('/:taskListSlug/tasks', subdomainTasklistMiddleware, taskRoutes);

export default router;
