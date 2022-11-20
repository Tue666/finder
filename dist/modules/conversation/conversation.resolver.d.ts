import { PaginationInput } from '../common/dto/common.dto';
import { User } from '../user/entities/user.entities';
import { ConversationService } from './conversation.service';
import { CreateConversationInput, FilterGetOnerConversation } from './dto/create-conversation.input';
import { Conversation, ConversationResult } from './entities/conversation.entity';
export declare class ConversationResolver {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    createConversation(createConversationInput: CreateConversationInput): Promise<boolean>;
    getAllConversation(pagination: PaginationInput, user: User): Promise<ConversationResult>;
    getOneConversation(input: FilterGetOnerConversation): Promise<Conversation>;
}
