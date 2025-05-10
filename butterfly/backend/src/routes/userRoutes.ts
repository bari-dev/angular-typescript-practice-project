import { Router } from 'express';
import { getAllUsersController, getCurrentUserProfile, getNotifications, getUserStats, markAllAsRead, markAsRead } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsersController);
router.get('/:userId/notifications', getNotifications);
router.put('/:userId/notifications/markAllRead', markAllAsRead);
router.put('/:userId/notifications/:notificationId/markAsRead', markAsRead);
router.get('/profile', getCurrentUserProfile);
router.get('/stats', getUserStats);

export default router;
