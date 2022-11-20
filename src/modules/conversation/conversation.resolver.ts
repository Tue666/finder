import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from '../../common/decorators/getuser.decorators';
import { AtGuard } from '../../common/guard/at.guard';
import { PaginationInput } from '../common/dto/common.dto';
import { User } from '../user/entities/user.entities';
import { ConversationService } from './conversation.service';
import {
  CreateConversationInput,
  FilterGetOnerConversation,
} from './dto/create-conversation.input';
import {
  Conversation,
  ConversationResult,
} from './entities/conversation.entity';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Mutation(() => Conversation)
  createConversation(
    @Args('createConversationInput')
    createConversationInput: CreateConversationInput,
  ) {
    return this.conversationService.create(createConversationInput);
  }

  @UseGuards(AtGuard)
  @Query(() => ConversationResult)
  getAllConversation(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
    @GetUser() user: User,
  ): Promise<ConversationResult> {
    return this.conversationService.findAll(pagination, user);
  }

  @Query(() => Conversation)
  getOneConversation(
    @Args('input', { type: () => FilterGetOnerConversation, nullable: true })
    input: FilterGetOnerConversation,
  ) {
    return this.conversationService.findOne(input);
  }
}
