import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICollection extends Document {
  ownerId: Types.ObjectId;
  name: string;
  description?: string;
  itemIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema: Schema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    description: { type: String },
    itemIds: [{ type: Schema.Types.ObjectId, ref: 'LibraryItem' }],
  },
  { timestamps: true }
);

export const CollectionModel = mongoose.model<ICollection>('Collection', CollectionSchema);
