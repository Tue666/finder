import { ConversationService } from '../conversation/conversation.service';
import { User } from '../user/entities/user.entities';
import { MessageInput, FilterGetAllMessage, PaginationMessageInput } from './dto/create-message.input';
import { Message, MessageResult } from './entities/message.entity';
import { MessageModelType } from './schema/message.schema';
export declare class MessageService {
    private messageModel;
    private conversationService;
    constructor(messageModel: MessageModelType, conversationService: ConversationService);
    create(input: MessageInput, user: User): Promise<Message>;
    findAll(filter: FilterGetAllMessage, pagination: PaginationMessageInput): Promise<MessageResult>;
    remove(_id: string): Promise<boolean>;
}
