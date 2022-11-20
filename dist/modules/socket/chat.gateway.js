"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const cache_manager_1 = require("cache-manager");
const constants_1 = require("../../constants/constants");
const logger_service_1 = require("../logger/logger.service");
const ws_guard_1 = require("../../common/guard/ws.guard");
let ChatGateway = class ChatGateway {
    constructor(userService, cacheManager, jwtService, loggerService) {
        this.userService = userService;
        this.cacheManager = cacheManager;
        this.jwtService = jwtService;
        this.loggerService = loggerService;
        this.loggerService.setContext('ChatGateway');
    }
    async handleDisconnect(socket) {
        const socketKey = constants_1.Constants.SOCKET + socket.userId;
        let socketIds = await this.cacheManager.get(socketKey);
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
            ttl: constants_1.Constants.SOCKET_ID_TTL,
        });
    }
    async handleConnection(socket, ...args) {
        let socketIds = [];
        if (socket.handshake.query && socket.handshake.query.token) {
            const token = socket.handshake.query.token;
            const payload = await this.jwtService.verify(token, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            });
            const user = await this.userService.findOne({ _id: payload._id });
            socket.userId = user._id.toString();
            const socketKey = constants_1.Constants.SOCKET + user._id.toString();
            socketIds = await this.cacheManager.get(socketKey);
            this.loggerService.debug(`Socket IDS in array: ${socketIds}`);
            if (socketIds) {
                socketIds.push(socket.id);
                this.loggerService.debug(`Socket IDS after push to array:${socketIds}`);
            }
            else {
                this.loggerService.debug('Push socket id to array');
                socketIds = [socket.id];
                await this.cacheManager.set(socketKey, socketIds, {
                    ttl: constants_1.Constants.SOCKET_ID_TTL,
                });
            }
        }
        else {
            throw new common_1.UnauthorizedException('Who are you?');
        }
    }
    handleEvent(socket, data) {
    }
    handleHeartBeat(socket, data) {
        this.loggerService.debug(socket.id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleDisconnect", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('events'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Object)
], ChatGateway.prototype, "handleEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('heartbeat'),
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleHeartBeat", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ transport: ['websocket'], allowEIO3: true }),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_service_1.UserService, typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object, jwt_1.JwtService,
        logger_service_1.LoggerService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map