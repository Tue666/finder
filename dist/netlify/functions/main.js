"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const main_1 = require("../../src/main");
let server;
const handler = async (event, context, callback) => {
    server = server !== null && server !== void 0 ? server : (await (0, main_1.bootstrapServerless)());
    return server(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=main.js.map