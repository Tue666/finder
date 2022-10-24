import { InputType, Int, Field } from '@nestjs/graphql';
import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entities/user.entities';
import { IConversation } from '../interfaces/conversation';

@InputType()
export class CreateConversationInput implements IConversation {
  lastMessage: string | Message;
  messagePin: string | Message;
  members: string[] | User[];
}
