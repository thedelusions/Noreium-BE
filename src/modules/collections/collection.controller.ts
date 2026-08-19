import { Request, Response, NextFunction } from 'express';
import * as service from './collection.service';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).userId as string;
    const cols = await service.listCollections(ownerId);
    res.json({ success: true, data: cols });
  } catch (err) {
    next(err);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).userId as string;
    const col = await service.getCollection(ownerId, req.params.id);
    res.json({ success: true, data: col });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).userId as string;
    const { name, description } = req.body;
    const col = await service.createCollection(ownerId, { name, description });
    res.status(201).json({ success: true, data: col });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).userId as string;
    const col = await service.updateCollection(ownerId, req.params.id, req.body);
    res.json({ success: true, data: col });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).userId as string;
    await service.deleteCollection(ownerId, req.params.id);
    res.json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
}

export async function addItem(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).userId as string;
    const collectionId = req.params.id;
    const { itemId } = req.body;
    const col = await service.addItem(ownerId, collectionId, itemId);
    res.json({ success: true, data: col });
  } catch (err) {
    next(err);
  }
}

export async function removeItem(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).userId as string;
    const collectionId = req.params.id;
    const itemId = req.params.itemId;
    const col = await service.removeItem(ownerId, collectionId, itemId);
    res.json({ success: true, data: col });
  } catch (err) {
    next(err);
  }
}
