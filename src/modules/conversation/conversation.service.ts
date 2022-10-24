import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationInput: UpdateConversationInput) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
