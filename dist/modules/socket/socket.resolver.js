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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const socket_service_1 = require("./socket.service");
const socket_entity_1 = require("./entities/socket.entity");
const create_socket_input_1 = require("./dto/create-socket.input");
const update_socket_input_1 = require("./dto/update-socket.input");
let SocketResolver = class SocketResolver {
    constructor(socketService) {
        this.socketService = socketService;
    }
    createSocket(createSocketInput) {
        return this.socketService.create(createSocketInput);
    }
    findAll() {
        return this.socketService.findAll();
    }
    findOne(id) {
        return this.socketService.findOne(id);
    }
    updateSocket(updateSocketInput) {
        return this.socketService.update(updateSocketInput.id, updateSocketInput);
    }
    removeSocket(id) {
        return this.socketService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => socket_entity_1.Socket),
    __param(0, (0, graphql_1.Args)('createSocketInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_socket_input_1.CreateSocketInput]),
    __metadata("design:returntype", void 0)
], SocketResolver.prototype, "createSocket", null);
__decorate([
    (0, graphql_1.Query)(() => [socket_entity_1.Socket], { name: 'socket' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SocketResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => socket_entity_1.Socket, { name: 'socket' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SocketResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => socket_entity_1.Socket),
    __param(0, (0, graphql_1.Args)('updateSocketInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_socket_input_1.UpdateSocketInput]),
    __metadata("design:returntype", void 0)
], SocketResolver.prototype, "updateSocket", null);
__decorate([
    (0, graphql_1.Mutation)(() => socket_entity_1.Socket),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SocketResolver.prototype, "removeSocket", null);
SocketResolver = __decorate([
    (0, graphql_1.Resolver)(() => socket_entity_1.Socket),
    __metadata("design:paramtypes", [socket_service_1.SocketService])
], SocketResolver);
exports.SocketResolver = SocketResolver;
//# sourceMappingURL=socket.resolver.js.map