import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from '../../constants/constants';
import { throwIfNotExists } from '../../utils/model.utils';
import { ConversationService } from '../conversation/conversation.service';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';
import { MessageModelType } from './schema/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: MessageModelType,
    private conversationService: ConversationService,
  ) {}
  async create(input: CreateMessageInput): Promise<Message> {
    try {
      const [maxCursor, message] = await Promise.all([
        this.messageModel
          .find({ conversion_id: input.conversion_id })
          .sort({ cursor: -1 })
          .limit(1),
        this.messageModel.create(input),
      ]);
      message.cursor = maxCursor[0].cursor + 1;
      await Promise.all([
        this.conversationService.findOneAndUpdate(
          { _id: input.conversion_id },
          { lastMessage: message._id },
        ),
        message.save(),
      ]);
      return message;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageInput: UpdateMessageInput) {
    return `This action updates a #${id} message`;
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
