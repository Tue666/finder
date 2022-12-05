import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { MessageType } from '../../../constants/enum';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { User } from '../../user/entities/user.entities';
import { IMessage } from '../interfaces/message';

@ObjectType()
export class Message implements IMessage {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  text: string;

  @Field(() => User, { nullable: true })
  sender: User;

  @Field(() => User, { nullable: true })
  receiver: User;

  @Field(() => Conversation, { nullable: true })
  conversion_id: Conversation;

  @Field(() => String, { nullable: true })
  type: string;

  @Field({ nullable: true })
  urlMessageImage: string;

  @Field(() => Number, { nullable: true })
  cursor: number;

  @Field(() => Boolean, { nullable: true })
  isDeleted: boolean;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  keyword: string;
}

@ObjectType()
export class MessageResult implements IResult<Message> {
  @Field(() => [Message], { nullable: true })
  results: Message[];

  @Field(() => Number, { nullable: true })
  totalCount: number;
}
