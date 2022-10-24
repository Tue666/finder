import { Model, Schema } from 'mongoose';
import { GenderEnum } from '../../../constants/enum';
import { Tag } from '../../tag/entities/tag.entity';
import { GeoLocation, MatchRequest, User } from '../entities/user.entities';

export const GeoLocationSchema = new Schema<GeoLocation>({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export const MatchRequestSchema = new Schema<MatchRequest>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: User.name,
      autopopulate: { maxDepth: 1 },
    },
    createdAt: { type: Date },
  },
  { _id: false },
);

export type UserModelType = Model<User>;
export const UserSchema = new Schema<User>(
  {
    username: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },
    address: { type: String, trim: true },
    showMeTinder: { type: Boolean, default: true },
    gender: { type: String, enum: Object.values(GenderEnum) },
    phoneNumber: { type: String, trim: true },
    birthDays: { type: Date },
    images: { type: [String] },
    getLocation: { type: GeoLocationSchema },
    lastActive: { type: Date },
    isDeleted: { type: Boolean },
    matchRequest: { type: [MatchRequestSchema] },
    matched: { type: [String] },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: Tag.name,
        autopopulate: { maxDepth: 1 },
      },
    ],
    slug: { type: String, trim: true },
    keyword: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);
