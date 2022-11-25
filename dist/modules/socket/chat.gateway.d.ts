import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Socket } from 'socket.io';
import { LoggerService } from '../logger/logger.service';
import { UserService } from '../user/user.service';
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
