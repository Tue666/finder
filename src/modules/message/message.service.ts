import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from '../../constants/constants';
import { FilterBuilder } from '../../utils/filter.query';
import { throwIfNotExists } from '../../utils/model.utils';
import { ConversationService } from '../conversation/conversation.service';
import {
  CreateMessageInput,
  FilterGetAllMessage,
  PaginationMessageInput,
} from './dto/create-message.input';
import { Message, MessageResult } from './entities/message.entity';
import { MessageModelType } from './schema/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: MessageModelType,
    private conversationService: ConversationService,
  ) {}
  async create(input: CreateMessageInput): Promise<Message> {
    try {
      console.log('as');
      const [conversation, message] = await Promise.all([
        this.conversationService.findOne({ _id: input.conversion_id }), //1
        this.messageModel.create(input), //2
      ]);
      message.cursor = conversation.lastMessage?.cursor + 1 || 1; //3  //4 //5
      conversation.lastMessage = message; //6
      await Promise.all([
        this.conversationService.updateModel(conversation), //7
        // message.populate('sender'),
        message.save(), //8
      ]);
      return message; //9
    } catch (error) {
      //10
      throw error; // 11
    }
  }

  async findAll(
    filter: FilterGetAllMessage,
    pagination: PaginationMessageInput,
  ): Promise<MessageResult> {
    try {
      const [queryFilter, querySort] = new FilterBuilder<Message>()
        .setFilterItem(
          'conversion_id',
          { $eq: filter?.conversion_id },
          filter?.conversion_id,
        )
        .setFilterItem('type', { $eq: filter?.type }, filter?.type)
        .setFilterItem(
          'cursor',
          { $gte: pagination?.cursor },
          pagination?.cursor,
        )
        .setSortItem('cursor', 1)
        .buildQuery();
      const [results, totalCount] = await Promise.all([
        this.messageModel.find(queryFilter).limit(pagination?.limit),
        this.messageModel.countDocuments(queryFilter),
      ]);
      return { results, totalCount };
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string): Promise<boolean> {
    try {
      const message = await this.messageModel.findOneAndUpdate(
        { _id },
        { $set: { isDeleted: true, text: Constants.MESSAGE_HAS_DELETED } },
        { new: true },
      );
      throwIfNotExists(message, 'Message not found');
      return message ? true : false;
    } catch (error) {
      throw error;
    }
  }
}
