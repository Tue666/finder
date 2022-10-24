import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { MessageSchema } from './schema/message.schema';
import { toKeyword, toSlug } from '../../utils/string.utils';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Message.name,
        useFactory: () => {
          MessageSchema.pre('save', function (next) {
            this.keyword = toKeyword(toSlug(this.text));
            return next();
          });
          return MessageSchema;
        },
      },
    ]),
  ],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
