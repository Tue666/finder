import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { FilterBuilder } from '../../utils/filter.query';
import { throwIfNotExists } from '../../utils/model.utils';
import { PaginationInput } from '../common/dto/common.dto';
import { LoggerService } from '../logger/logger.service';
import { User } from '../user/entities/user.entities';
import { CreateConversationInput } from './dto/create-conversation.input';
import {
  Conversation,
  ConversationResult,
} from './entities/conversation.entity';
import { ConversationModelType } from './schema/conversion.schema';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversionModel: ConversationModelType,
    private loggerService: LoggerService,
  ) {}
  async create(input: CreateConversationInput): Promise<boolean> {
    try {
      const conversation = await this.conversionModel.create(input);
      return conversation ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    input: PaginationInput,
    user: User,
  ): Promise<ConversationResult> {
    const query = new FilterBuilder<Conversation>()
      .setFilterItem(
        'members',
        {
          $in: [user._id.toString()],
        },
        user._id,
      )
      .buildQuery();
    const [results, totalCount] = await Promise.all([
      this.conversionModel
        .find(query)
        .skip(input?.size)
        .limit((input?.page - 1) * input?.size),
      this.conversionModel.count(query),
    ]);
    console.log(results);
    this.loggerService.debug(`Conversation result :${results.length}`);
    return { results, totalCount };
  }

  async findOne(_id: string): Promise<Conversation> {
    try {
      const conversation = await this.conversionModel.findOne({ _id });
      throwIfNotExists(conversation, 'Conversation not found');
      return conversation;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndUpdate(
    filter: FilterQuery<Conversation>,
    update: UpdateQuery<Conversation>,
  ): Promise<Conversation> {
    try {
      const conversation = await this.conversionModel.findOneAndUpdate(
        filter,
        update,
        {
          new: true,
        },
      );
      return conversation;
    } catch (error) {
      throw error;
    }
  }

  remove(_id: string): Promise<boolean> {
    // return `This action removes a #${id} conversation`;
    return null;
  }
}
