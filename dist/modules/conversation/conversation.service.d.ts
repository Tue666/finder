import { FilterQuery, UpdateQuery } from 'mongoose';
import { PaginationInput } from '../common/dto/common.dto';
import { LoggerService } from '../logger/logger.service';
import { User } from '../user/entities/user.entities';
import { CreateConversationInput, FilterGetOnerConversation } from './dto/create-conversation.input';
import { Conversation, ConversationResult } from './entities/conversation.entity';
import { ConversationModelType } from './schema/conversion.schema';
export declare class ConversationService {
    private conversionModel;
    private loggerService;
    constructor(conversionModel: ConversationModelType, loggerService: LoggerService);
    create(input: CreateConversationInput): Promise<boolean>;
    findAll(input: PaginationInput, user: User): Promise<ConversationResult>;
    findOne(input: FilterGetOnerConversation): Promise<Conversation>;
    findOneAndUpdate(filter: FilterQuery<Conversation>, update: UpdateQuery<Conversation>): Promise<Conversation>;
}
