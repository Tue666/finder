import { ConversationService } from '../conversation/conversation.service';
import { ChatGateway } from '../socket/chat.gateway';
import { User } from '../user/entities/user.entities';
import { UserService } from '../user/user.service';
import { MessageInput, FilterGetAllMessage, PaginationMessageInput } from './dto/create-message.input';
import { Message, MessageResult } from './entities/message.entity';
import { MessageModelType } from './schema/message.schema';
export declare class MessageService {
    private messageModel;
    private conversationService;
    private userService;
    private chatGateway;
    constructor(messageModel: MessageModelType, conversationService: ConversationService, userService: UserService, chatGateway: ChatGateway);
    create(input: MessageInput, user: User): Promise<Message>;
    handleFirstMessage(sender: User, receiver: User, isFirstMessage: boolean): Promise<void>;
    findAll(filter: FilterGetAllMessage, pagination: PaginationMessageInput): Promise<MessageResult>;
    remove(_id: string): Promise<boolean>;
}
