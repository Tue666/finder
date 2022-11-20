import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { LoggerService } from '../logger/logger.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private userService;
    private cacheManager;
    private jwtService;
    private loggerService;
    constructor(userService: UserService, cacheManager: Cache, jwtService: JwtService, loggerService: LoggerService);
    private server;
    handleDisconnect(socket: Socket): Promise<void>;
    handleConnection(socket: Socket, ...args: any[]): Promise<void>;
    handleEvent(socket: Socket, data: unknown): any;
    handleHeartBeat(socket: Socket, data: any): void;
}
