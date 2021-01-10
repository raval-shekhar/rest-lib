"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapServer = void 0;
const http_1 = __importDefault(require("http"));
const rest_server_1 = __importDefault(require("./rest-server"));
const logger_1 = require("./logger/logger");
const BootstrapServer = (port, router, securityOptions) => {
    const app = new rest_server_1.default();
    if (typeof process.env.APP_NAME === 'undefined' && typeof process.env.NODE_ENV === 'undefined') {
        throw Error('Please specify NODE_ENV and APP_NAME in environment');
    }
    const logger = new logger_1.Logger('SERVER');
    const server = http_1.default.createServer(app.express);
    app.setHelmet(securityOptions);
    app.requestLogger(process.env.NODE_ENV == 'development');
    app.setRoute(router.prefix, router.router);
    app.catchErrors();
    server.listen(port);
    return new Promise((resolve, reject) => {
        server.on('listening', () => {
            logger.debug(`${process.env.NODE_ENV.toUpperCase()} server is listening to ${port}`);
            resolve();
        });
        const onError = (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
            switch (error.code) {
                case 'EACCES':
                    logger.error(`${bind} requires elevated privileges`);
                    reject();
                    break;
                case 'EADDRINUSE':
                    logger.error(`${bind} is already in use`);
                    reject();
                default:
                    throw error;
            }
        };
        server.on('error', onError);
    });
};
exports.BootstrapServer = BootstrapServer;
//# sourceMappingURL=http-server.js.map