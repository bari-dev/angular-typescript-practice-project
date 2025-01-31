import { Router } from 'express';
import { getAllUsersController, getCurrentUserProfile, getNotifications, getUserStats } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsersController);
router.get('/:userId/notifications', getNotifications);
router.get('/profile', getCurrentUserProfile);
router.get('/stats', getUserStats);

export default router;
