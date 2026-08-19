import { Router } from 'express';
import * as ctrl from './collection.controller';
import { verifyTokenMiddleware } from '../../middleware/verify-token';

const router = Router();

router.use(verifyTokenMiddleware);

router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.get('/:id', ctrl.get);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

router.post('/:id/items', ctrl.addItem);
router.delete('/:id/items/:itemId', ctrl.removeItem);

export default router;
