import { subLoginController } from '../controllers/subdomainAuthController';
import { Router } from 'express';

const router = Router();

router.post('/login', subLoginController);

export default router;
