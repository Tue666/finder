import { forwardRef, Module } from '@nestjs/common';
import { ConversationModule } from 'modules/conversation/conversation.module';
import { MessageModule } from 'modules/message/message.module';
import { WsStrategy } from '../../auth/strategies/ws.strategies';
import { LoggerModule } from '../logger/logger.module';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';
import { SocketService } from './socket.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => MessageModule),
    LoggerModule,
    ConversationModule,
  ],
  providers: [SocketService, ChatGateway, WsStrategy],
  exports: [ChatGateway],
})
export class SocketModule {}
