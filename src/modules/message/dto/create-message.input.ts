import { Field, HideField, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { GraphQLObjectID } from 'graphql-scalars';
import { MessageType } from '../../../constants/enum';
import { IMessage, IMessageCreate } from '../interfaces/message';

@InputType()
export class FilterGetAllMessage implements Partial<IMessage> {
  @Field(() => GraphQLObjectID, { nullable: true })
  conversion_id?: string;

  @Field(() => MessageType, { nullable: true })
  type?: MessageType;
}

@InputType()
export class PaginationMessageInput {
  @Field(() => Number, { nullable: true })
  cursor: number;

  @Field(() => Number, { nullable: true })
  limit: number;
}

@InputType()
export class MessageInput implements IMessageCreate {
  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  uuid: string;

  @HideField()
  sender: string;

  @Field(() => GraphQLObjectID)
  receiver: string;

  @Field(() => GraphQLObjectID)
  conversion_id: string;

  @Field(() => MessageType)
  type: MessageType;
}

@InputType()
export class Here {
  @Field()
  txt: string;
}
