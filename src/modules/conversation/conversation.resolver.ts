import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationInput } from './dto/create-conversation.input';
import { UpdateConversationInput } from './dto/update-conversation.input';
import { GraphQLObjectID } from 'graphql-scalars';

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

  @Query(() => [Conversation], { name: 'conversation' })
  findAll() {
    return this.conversationService.findAll();
  }

  @Query(() => Conversation, { name: 'conversation' })
  findOne(
    @Args('conversation_id', { type: () => GraphQLObjectID })
    conversation_id: string,
  ) {
    return this.conversationService.findOne(conversation_id);
  }
}
