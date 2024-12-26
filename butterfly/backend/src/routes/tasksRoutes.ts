import tasksController from '../controllers/tasksController';
import { Router } from 'express';

const router = Router();

router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.createTask);
router.get('/:taskId', tasksController.getTaskById);
router.put('/:taskId', tasksController.updateTask);
router.delete('/:taskId', tasksController.deleteTask);
router.patch('/:taskId/toggleStatus', tasksController.updateStatus);

export default router;
