import * as repo from './library-item.repository';
import { ILibraryItem } from './library-item.model';
import { Types } from 'mongoose';
import { ApiError } from '../../utils/ApiError';

export async function listItems(ownerId: string) {
  return repo.findLibraryItemsByOwner(ownerId);
}

export async function getItem(ownerId: string, id: string) {
  const item = await repo.findLibraryItemByIdAndOwner(id, ownerId);
  if (!item) throw new ApiError(404, 'Not found');
  return item;
}

export async function createItem(ownerId: string, data: Partial<ILibraryItem>) {
  const toCreate = { ...data, ownerId: new Types.ObjectId(ownerId) } as Partial<ILibraryItem>;
  return repo.createLibraryItem(toCreate);
}

export async function updateItem(ownerId: string, id: string, data: Partial<ILibraryItem>) {
  const item = await repo.updateLibraryItemByIdAndOwner(id, ownerId, data);
  if (!item) throw new ApiError(404, 'Not found');
  return item;
}

export async function deleteItem(ownerId: string, id: string) {
  const item = await repo.deleteLibraryItemByIdAndOwner(id, ownerId);
  if (!item) throw new ApiError(404, 'Not found');
  return item;
}
