import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { AtGuard } from '../../common/guard/at.guard';
import {
  FilterGetAllMessage,
  MessageInput,
  PaginationMessageInput,
} from './dto/create-message.input';
import { Message, MessageResult } from './entities/message.entity';
import { MessageService } from './message.service';

@Resolver(() => Message)
@UseGuards(AtGuard)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => MessageResult)
  getAllMessage(
    @Args('filter', { type: () => FilterGetAllMessage, nullable: true })
    filter: FilterGetAllMessage,
    @Args('pagination', { type: () => PaginationMessageInput, nullable: true })
    pagination: PaginationMessageInput,
  ): Promise<MessageResult> {
    return this.messageService.findAll(filter, pagination);
  }

  @Mutation(() => Message)
  removeMessage(
    @Args('message_id', { type: () => GraphQLObjectID }) _id: string,
  ): Promise<boolean> {
    return this.messageService.remove(_id);
  }

  @Mutation(() => Boolean)
  createMessage(@Args('input') input: MessageInput) {
    return true;
  }
}
