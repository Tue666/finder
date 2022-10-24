import { Model, Schema } from 'mongoose';
import { Tag } from '../entities/tag.entity';

export type TagModelType = Model<Tag>;
export const TagSchema = new Schema<Tag>(
  {
    name: { type: String, trim: true },
    slug: { type: String, trim: true },
    keyword: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
