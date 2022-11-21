"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
let GraphqlService = class GraphqlService {
    async createGqlOptions() {
        return {
            cors: {
                credentials: true,
                origin: '*',
            },
            context: ({ req, res }) => ({ req, res }),
            debug: false,
            autoSchemaFile: (0, path_1.join)(process.cwd(), '../../../tmp/schema.gql'),
            subscriptions: { 'graphql-ws': true },
            sortSchema: true,
            cache: 'bounded',
            formatError: (error) => {
                var _a, _b, _c, _d;
                const formattedError = {
                    message: error.message,
                    code: ((_a = error === null || error === void 0 ? void 0 : error.extensions) === null || _a === void 0 ? void 0 : _a.code) || 'INTERNAL_SERVER_ERROR',
                };
                const extensions = (error === null || error === void 0 ? void 0 : error.extensions) || null;
                if ((_b = extensions === null || extensions === void 0 ? void 0 : extensions.exception) === null || _b === void 0 ? void 0 : _b.status) {
                    formattedError['statusCode'] = extensions.exception.status || 500;
                    delete formattedError.code;
                }
                else if ((_c = extensions === null || extensions === void 0 ? void 0 : extensions.response) === null || _c === void 0 ? void 0 : _c.statusCode) {
                    const response = extensions.response;
                    formattedError.message = (response === null || response === void 0 ? void 0 : response.message) || error.message;
                    formattedError['statusCode'] = (response === null || response === void 0 ? void 0 : response.statusCode) || 500;
                    delete formattedError.code;
                }
                else if (((_d = extensions === null || extensions === void 0 ? void 0 : extensions.exception) === null || _d === void 0 ? void 0 : _d.code) === 11000 ||
                    error.message.match(/E11000/)) {
                    formattedError.message = 'Duplicate document';
                    formattedError['statusCode'] = 409;
                    delete formattedError.code;
                }
                return formattedError;
            },
        };
    }
};
GraphqlService = __decorate([
    (0, common_1.Injectable)()
], GraphqlService);
exports.GraphqlService = GraphqlService;
//# sourceMappingURL=graphql.config.js.map