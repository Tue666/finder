import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketResolver } from './socket.resolver';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { LoggerModule } from '../logger/logger.module';
import { WsStrategy } from '../../auth/strategies/ws.strategies';

@Module({
  imports: [UserModule, LoggerModule],
  providers: [
    SocketResolver,
    SocketService,
    ChatGateway,
    JwtService,
    WsStrategy,
  ],
})
export class SocketModule {}
