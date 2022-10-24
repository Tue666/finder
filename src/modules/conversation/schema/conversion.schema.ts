import { Model, Schema } from 'mongoose';
import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entities/user.entities';
import { Conversation } from '../entities/conversation.entity';

export type ConversationModelType = Model<Conversation>;
export const ConversationSchema = new Schema<Conversation>(
  {
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: Message.name,
      autopopulate: { maxDepth: 1 },
    },
    messagePin: {
      type: Schema.Types.ObjectId,
      ref: Message.name,
      autopopulate: { maxDepth: 1 },
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: User.name,
        autopopulate: { maxDepth: 1 },
      },
    ],
    keyword: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
