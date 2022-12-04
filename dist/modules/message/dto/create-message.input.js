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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Here = exports.MessageInput = exports.PaginationMessageInput = exports.FilterGetAllMessage = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
const enum_1 = require("../../../constants/enum");
let FilterGetAllMessage = class FilterGetAllMessage {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLObjectID, { nullable: true }),
    __metadata("design:type", String)
], FilterGetAllMessage.prototype, "conversion_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.MessageType, { nullable: true }),
    __metadata("design:type", String)
], FilterGetAllMessage.prototype, "type", void 0);
FilterGetAllMessage = __decorate([
    (0, graphql_1.InputType)()
], FilterGetAllMessage);
exports.FilterGetAllMessage = FilterGetAllMessage;
let PaginationMessageInput = class PaginationMessageInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], PaginationMessageInput.prototype, "cursor", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], PaginationMessageInput.prototype, "limit", void 0);
PaginationMessageInput = __decorate([
    (0, graphql_1.InputType)()
], PaginationMessageInput);
exports.PaginationMessageInput = PaginationMessageInput;
let MessageInput = class MessageInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MessageInput.prototype, "text", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MessageInput.prototype, "uuid", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], MessageInput.prototype, "sender", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLObjectID),
    __metadata("design:type", String)
], MessageInput.prototype, "receiver", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLObjectID),
    __metadata("design:type", String)
], MessageInput.prototype, "conversion_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.MessageType),
    __metadata("design:type", String)
], MessageInput.prototype, "type", void 0);
MessageInput = __decorate([
    (0, graphql_1.InputType)()
], MessageInput);
exports.MessageInput = MessageInput;
let Here = class Here {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Here.prototype, "txt", void 0);
Here = __decorate([
    (0, graphql_1.InputType)()
], Here);
exports.Here = Here;
//# sourceMappingURL=create-message.input.js.map