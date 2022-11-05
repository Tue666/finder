import { Field, InputType } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { User } from '../../user/entities/user.entities';
import { IConversation } from '../interfaces/conversation';

@InputType()
export class CreateConversationInput implements IConversation {
  @Field(() => GraphQLObjectID, { nullable: true })
  lastMessage?: string;

  @Field(() => GraphQLObjectID, { nullable: true })
  messagePin?: string;

  @Field(() => [GraphQLObjectID], { nullable: true })
  members: string[];
}
