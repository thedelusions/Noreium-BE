import { Router } from 'express';
import * as controller from './auth.controller';
import { verifyTokenMiddleware } from '../../middleware/verify-token';

const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', verifyTokenMiddleware, controller.me);

export default router;
