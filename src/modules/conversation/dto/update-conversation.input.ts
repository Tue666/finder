import { CreateConversationInput } from './create-conversation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';

@InputType()
export class UpdateConversationInput extends PartialType(
  CreateConversationInput,
) {
  @Field(() => GraphQLObjectID)
  _id: number;
}
