import { Request, Response, NextFunction } from 'express';
import * as service from './library-item.service';
import { createLibraryItemSchema, updateLibraryItemSchema } from './library-item.validation';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).userId as string;
    const items = await service.listItems(ownerId);
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).userId as string;
    const id = req.params.id;
    const item = await service.getItem(ownerId, id);
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createLibraryItemSchema.parse(req.body);
    const ownerId = (req as any).userId as string;
    const item = await service.createItem(ownerId, parsed as any);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = updateLibraryItemSchema.parse(req.body);
    const ownerId = (req as any).userId as string;
    const id = req.params.id;
    const item = await service.updateItem(ownerId, id, parsed as any);
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).userId as string;
    const id = req.params.id;
    await service.deleteItem(ownerId, id);
    res.json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
}
