"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestServer = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const error_1 = require("./middleware/error");
const helmet_1 = require("./security/helmet");
const http_options_1 = require("./logger/http-options");
class RestServer {
    constructor() {
        this.express = express_1.default();
        this.setMiddleware();
    }
    setMiddleware() {
        this.express.use(compression_1.default());
    }
    requestLogger(preetyPrint) {
        this.express.use(http_options_1.RequestLogger(preetyPrint));
    }
    setHelmet(securityOptions) {
        this.express.use(helmet_1.Helmet(securityOptions));
    }
    setRoute(prefix, router) {
        this.express.use(prefix, router);
    }
    catchErrors() {
        this.express.use(error_1.RouteNotFound);
        this.express.use(error_1.ErrorConverter);
        this.express.use(error_1.ErrorHandler);
    }
}
exports.RestServer = RestServer;
exports.default = RestServer;
//# sourceMappingURL=rest-server.js.map