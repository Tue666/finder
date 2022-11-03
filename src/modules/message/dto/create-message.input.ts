import { Field, InputType } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { MessageType } from '../../../constants/enum';
import { IMessageCreate } from '../interfaces/message';

@InputType()
export class CreateMessageInput implements IMessageCreate {
  @Field()
  text: string;

  @Field(() => GraphQLObjectID)
  sender: string;

  @Field(() => GraphQLObjectID)
  receiver: string;

  @Field(() => GraphQLObjectID)
  conversion_id: string;

  @Field(() => MessageType)
  type: MessageType;
}
