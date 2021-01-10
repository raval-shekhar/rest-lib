"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const os_1 = __importDefault(require("os"));
const Pino = (filename, prettyPrint) => {
    return pino_1.default({
        level: process.env.LEVEL,
        name: process.env.APP_NAME,
        messageKey: 'message',
        base: {
            pid: process.pid,
            host: os_1.default.hostname,
            filename: filename,
            app: process.env.APP_NAME
        },
        prettifier: prettyPrint,
        prettyPrint: prettyPrint ? {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss.l',
            crlf: true,
            ignore: 'pid,filename,app,message',
            messageFormat: '[{filename}] - {message}'
        } : false,
        enabled: true,
        formatters: {
            level: (level, number) => {
                return { level: level, number };
            },
        }
    });
};
exports.default = Pino;
//# sourceMappingURL=config.js.map