import { MessageService } from './message.service';
import { MessageResult } from './entities/message.entity';
import { FilterGetAllMessage, PaginationMessageInput } from './dto/create-message.input';
export declare class MessageResolver {
    private readonly messageService;
    constructor(messageService: MessageService);
    getAllMessage(filter: FilterGetAllMessage, pagination: PaginationMessageInput): Promise<MessageResult>;
    removeMessage(_id: string): Promise<boolean>;
}
