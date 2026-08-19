import mongoose, { Schema, Document, Types } from 'mongoose';

export type LibraryItemType = 'TOOL' | 'API' | 'WEBSITE' | 'RESOURCE';

export interface ILibraryItem extends Document {
  ownerId: Types.ObjectId;
  type: LibraryItemType;
  name: string;
  description?: string;
  url?: string;
  tags?: string[];
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

const LibraryItemSchema: Schema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['TOOL', 'API', 'WEBSITE', 'RESOURCE'], required: true },
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    tags: [{ type: String }],
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const LibraryItemModel = mongoose.model<ILibraryItem>('LibraryItem', LibraryItemSchema);
