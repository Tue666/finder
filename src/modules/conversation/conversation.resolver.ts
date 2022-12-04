import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from '../../common/decorators/getuser.decorators';
import { AtGuard } from '../../common/guard/at.guard';
import { PaginationInput } from '../common/dto/common.dto';
import { User } from '../user/entities/user.entities';
import { ConversationService } from './conversation.service';
import {
  CreateConversationInput,
  FilterGetOneConversation,
} from './dto/create-conversation.input';
import {
  Conversation,
  ConversationResult,
} from './entities/conversation.entity';

@Resolver(() => Conversation)
@UseGuards(AtGuard)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Mutation(() => Conversation)
  createConversation(
    @Args('input')
    input: CreateConversationInput,
  ) {
    return this.conversationService.create(input);
  }

  @Query(() => ConversationResult)
  getAllConversation(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
    @GetUser() user: User,
  ): Promise<ConversationResult> {
    return this.conversationService.findAll(pagination, user);
  }

  @Query(() => ConversationResult)
  getAllUserMatched(
    @GetUser() user: User,
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
    @Args('isMessaged', { type: () => Boolean, nullable: true })
    isMessaged: boolean,
  ): Promise<ConversationResult> {
    return this.conversationService.getAllUserMatched(
      pagination,
      user._id.toString(),
      isMessaged,
    );
  }

  @Query(() => Conversation)
  getOneConversation(
    @Args('input', { type: () => FilterGetOneConversation, nullable: true })
    input: FilterGetOneConversation,
    @GetUser() user: User,
  ) {
    return this.conversationService.findOne(input, user);
  }
}
