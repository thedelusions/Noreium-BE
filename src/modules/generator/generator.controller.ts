import { Request, Response, NextFunction } from 'express';
import { generateScript } from './generator.service';

export async function generateScriptController(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).userId as string;
    const { collectionId, platform } = req.body;
    const result = await generateScript(ownerId, collectionId, platform);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
