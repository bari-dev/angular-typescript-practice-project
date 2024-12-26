import { Router } from 'express';
import { getAllUsersController, getCurrentUserProfile } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsersController);
router.get('/profile', getCurrentUserProfile);

export default router;
