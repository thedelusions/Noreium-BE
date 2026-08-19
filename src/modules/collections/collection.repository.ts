import { CollectionModel, ICollection } from './collection.model';
import { Types } from 'mongoose';

export const createCollection = async (data: Partial<ICollection>) => {
  return CollectionModel.create(data);
};

export const findCollectionsByOwner = async (ownerId: string) => {
  return CollectionModel.find({ ownerId: new Types.ObjectId(ownerId) }).exec();
};

export const findCollectionByIdAndOwner = async (id: string, ownerId: string) => {
  return CollectionModel.findOne({ _id: id, ownerId: new Types.ObjectId(ownerId) }).exec();
};

export const updateCollectionByIdAndOwner = async (
  id: string,
  ownerId: string,
  update: Partial<ICollection>
) => {
  return CollectionModel.findOneAndUpdate(
    { _id: id, ownerId: new Types.ObjectId(ownerId) },
    update,
    { new: true }
  ).exec();
};

export const deleteCollectionByIdAndOwner = async (id: string, ownerId: string) => {
  return CollectionModel.findOneAndDelete({ _id: id, ownerId: new Types.ObjectId(ownerId) }).exec();
};

export const addItemToCollection = async (
  collectionId: string,
  ownerId: string,
  itemId: string
) => {
  return CollectionModel.findOneAndUpdate(
    { _id: collectionId, ownerId: new Types.ObjectId(ownerId) },
    { $addToSet: { itemIds: new Types.ObjectId(itemId) } },
    { new: true }
  ).exec();
};

export const removeItemFromCollection = async (
  collectionId: string,
  ownerId: string,
  itemId: string
) => {
  return CollectionModel.findOneAndUpdate(
    { _id: collectionId, ownerId: new Types.ObjectId(ownerId) },
    { $pull: { itemIds: new Types.ObjectId(itemId) } },
    { new: true }
  ).exec();
};
