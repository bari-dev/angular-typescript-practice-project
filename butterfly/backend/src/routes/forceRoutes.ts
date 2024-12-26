import ForceController from '../controllers/forceController';
import { Router } from 'express';

const router = Router();

router.post('/', ForceController.connectForceAccount);

export default router;
