import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import { ApiError } from '../../utils/ApiError';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const user = await authService.register(payload);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const result = await authService.login(payload);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).userId as string;
    if (!userId) throw new ApiError(401, 'Unauthorized');
    const user = await authService.getCurrentUser(userId);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}
