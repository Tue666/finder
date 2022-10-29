import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketResolver } from './socket.resolver';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [SocketResolver, SocketService, ChatGateway],
})
export class SocketModule {}
