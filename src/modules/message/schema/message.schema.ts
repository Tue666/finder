import { Model, Schema } from 'mongoose';
import { MessageType } from '../../../constants/enum';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { User } from '../../user/entities/user.entities';
import { Message } from '../entities/message.entity';

export type MessageModelType = Model<Message>;
export const MessageSchema = new Schema<Message>(
  {
    text: { type: String, trim: true },
    sender: {
      type: Schema.Types.ObjectId,
      ref: User.name,
      autopopulate: { maxDepth: 1 },
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: User.name,
      autopopulate: { maxDepth: 1 },
      required: true,
    },
    conversion_id: {
      type: Schema.Types.ObjectId,
      ref: Conversation.name,
      autopopulate: { maxDepth: false },
      required: true,
    },
    cursor: { type: Number, required: true },
    urlMessageImage: { type: String, trim: true },
    type: { type: String, enum: Object.values(MessageType) },
    isDeleted: { type: Boolean },
    keyword: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
