import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../../auth/entities/auth.entities';
import { Cache } from 'cache-manager';
import { Constants } from '../../constants/constants';
import { LoggerService } from '../logger/logger.service';
import { WsGuard } from '../../common/guard/ws.guard';
import { GetUser } from '../../common/decorators/getuser.decorators';
import { User } from '../user/entities/user.entities';

@WebSocketGateway({ transport: ['websocket'], allowEIO3: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext('ChatGateway');
  }
  @WebSocketServer()
  private server: Server;
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const socketKey = Constants.SOCKET + (socket as any).userId;
    let socketIds: string[] = await this.cacheManager.get(socketKey);
    this.loggerService.log(`Socket IDS in array: ${socketIds}`);
    if (!socketIds) {
      return;
    }
    socketIds = socketIds.filter(socketId => {
      if (socketId != socket.id) {
        return socketId;
      }
    });
    this.loggerService.log(`Socket IDS in array After: ${socketIds}`);
    await this.cacheManager.set(socketKey, socketIds, {
      ttl: Constants.SOCKET_ID_TTL,
    });
  }

  async handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
    let socketIds: string[] = [];
    if (socket.handshake.query && socket.handshake.query.token) {
      const token: string = socket.handshake.query.token as string;
      const payload: IJwtPayload = await this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });
      const user = await this.userService.findOne({ _id: payload._id });
      (socket as any).userId = user._id.toString();
      const socketKey = Constants.SOCKET + user._id.toString();
      socketIds = await this.cacheManager.get(socketKey);
      this.loggerService.debug(`Socket IDS in array: ${socketIds}`);
      if (socketIds) {
        socketIds.push(socket.id);
        this.loggerService.debug(`Socket IDS after push to array:${socketIds}`);
      } else {
        this.loggerService.debug('Push socket id to array');
        socketIds = [socket.id];
        await this.cacheManager.set(socketKey, socketIds, {
          ttl: Constants.SOCKET_ID_TTL,
        });
      }
    } else {
      throw new UnauthorizedException('Who are you?');
    }
  }

  @SubscribeMessage('events')
  handleEvent(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: unknown,
  ): any {
    // console.log(socket.userId);
    // return { event, data };
  }

  @SubscribeMessage('heartbeat')
  @UseGuards(WsGuard)
  handleHeartBeat(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    this.loggerService.debug(socket.id);
  }
}
