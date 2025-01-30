import { Router } from 'express';
import { getAllUsersController, getCurrentUserProfile, getNotifications } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsersController);
router.get('/:userId/notifications', getNotifications);
router.get('/profile', getCurrentUserProfile);

export default router;
