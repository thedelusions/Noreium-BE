import { LibraryItemModel, ILibraryItem } from './library-item.model';
import { Types } from 'mongoose';

export const createLibraryItem = async (item: Partial<ILibraryItem>) => {
  return LibraryItemModel.create(item);
};

export const findLibraryItemsByOwner = async (ownerId: string) => {
  return LibraryItemModel.find({ ownerId: new Types.ObjectId(ownerId) }).exec();
};

export const findLibraryItemByIdAndOwner = async (id: string, ownerId: string) => {
  return LibraryItemModel.findOne({ _id: id, ownerId: new Types.ObjectId(ownerId) }).exec();
};

export const updateLibraryItemByIdAndOwner = async (
  id: string,
  ownerId: string,
  update: Partial<ILibraryItem>
) => {
  return LibraryItemModel.findOneAndUpdate(
    { _id: id, ownerId: new Types.ObjectId(ownerId) },
    update,
    { new: true }
  ).exec();
};

export const deleteLibraryItemByIdAndOwner = async (id: string, ownerId: string) => {
  return LibraryItemModel.findOneAndDelete({
    _id: id,
    ownerId: new Types.ObjectId(ownerId),
  }).exec();
};
