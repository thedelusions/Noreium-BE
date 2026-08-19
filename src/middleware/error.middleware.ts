import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ success: false, message: err.message, errors: err.errors });
  }

  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
}
