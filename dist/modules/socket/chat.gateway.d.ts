import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { CreateMessageInput } from 'modules/message/dto/create-message.input';
import { Message } from 'modules/message/entities/message.entity';
import { MessageService } from 'modules/message/message.service';
import { User } from 'modules/user/entities/user.entities';
import { Server, Socket } from 'socket.io';
import { LoggerService } from '../logger/logger.service';
import { UserService } from '../user/user.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private userService;
    private cacheManager;
    private jwtService;
    private loggerService;
    private messageService;
    constructor(userService: UserService, cacheManager: Cache, jwtService: JwtService, loggerService: LoggerService, messageService: MessageService);
    server: Server;
    handleDisconnect(socket: Socket): Promise<void>;
    handleConnection(socket: Socket, ...args: any[]): Promise<void>;
    afterInit(server: Server): void;
    sendMessage(socket: Socket, data: CreateMessageInput): Promise<Message>;
    handleHeartBeat(socket: Socket, data: any, user: User): void;
}
