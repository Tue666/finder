import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { throwIfNotExists } from '../../utils/model.utils';
import { CreateConversationInput } from './dto/create-conversation.input';
import { UpdateConversationInput } from './dto/update-conversation.input';
import { Conversation } from './entities/conversation.entity';
import { ConversationModelType } from './schema/conversion.schema';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversionModel: ConversationModelType,
  ) {}
  async create(input: CreateConversationInput): Promise<boolean> {
    const conversation = await this.conversionModel.create(input);
    return conversation ? true : false;
  }

  findAll() {
    return `This action returns all conversation`;
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
