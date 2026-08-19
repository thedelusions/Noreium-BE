import { Router } from 'express';
import { generateScriptController } from './generator.controller';
import { verifyTokenMiddleware } from '../../middleware/verify-token';
import { z } from 'zod';

const router = Router();

const bodySchema = z.object({ collectionId: z.string(), platform: z.enum(['windows', 'linux']) });

router.post('/script', verifyTokenMiddleware, (req, res, next) => {
  try {
    bodySchema.parse(req.body);
    return generateScriptController(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default router;
