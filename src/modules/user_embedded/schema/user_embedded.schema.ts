import { Model, Schema } from 'mongoose';
import { User } from '../../user/entities/user.entities';
import { UserEmbedded } from '../entities/user_embedded.entity';

export type UserEmbeddedModelType = Model<UserEmbedded>;
export const UserEmbeddedSchema = new Schema<UserEmbedded>(
  {
    user: { type: Schema.Types.ObjectId, ref: User.name },
    unlikeUser: [{ type: String }],
    count: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);
