import * as repo from './collection.repository';
import { Types } from 'mongoose';
import { ApiError } from '../../utils/ApiError';
import { findLibraryItemByIdAndOwner } from '../library-items/library-item.repository';

export async function createCollection(
  ownerId: string,
  data: { name: string; description?: string }
) {
  return repo.createCollection({ ...data, ownerId: new Types.ObjectId(ownerId) } as any);
}

export async function listCollections(ownerId: string) {
  return repo.findCollectionsByOwner(ownerId);
}

export async function getCollection(ownerId: string, id: string) {
  const col = await repo.findCollectionByIdAndOwner(id, ownerId);
  if (!col) throw new ApiError(404, 'Not found');
  return col;
}

export async function updateCollection(
  ownerId: string,
  id: string,
  data: Partial<{ name: string; description?: string }>
) {
  const col = await repo.updateCollectionByIdAndOwner(id, ownerId, data as any);
  if (!col) throw new ApiError(404, 'Not found');
  return col;
}

export async function deleteCollection(ownerId: string, id: string) {
  const col = await repo.deleteCollectionByIdAndOwner(id, ownerId);
  if (!col) throw new ApiError(404, 'Not found');
  return col;
}

export async function addItem(ownerId: string, collectionId: string, itemId: string) {
  // Verify item ownership
  const item = await findLibraryItemByIdAndOwner(itemId, ownerId);
  if (!item) throw new ApiError(404, 'Item not found or not owned by user');
  const updated = await repo.addItemToCollection(collectionId, ownerId, itemId);
  if (!updated) throw new ApiError(404, 'Collection not found');
  return updated;
}

export async function removeItem(ownerId: string, collectionId: string, itemId: string) {
  const updated = await repo.removeItemFromCollection(collectionId, ownerId, itemId);
  if (!updated) throw new ApiError(404, 'Collection not found');
  return updated;
}
