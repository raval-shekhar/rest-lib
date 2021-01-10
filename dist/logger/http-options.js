"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLogger = void 0;
const pino_http_1 = __importDefault(require("pino-http"));
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("./config"));
const RequestLogger = (preetyPrint) => pino_http_1.default({
    logger: config_1.default('HTTP', preetyPrint),
    serializers: {
        err: pino_1.default.stdSerializers.err,
        req: pino_1.default.stdSerializers.req,
        res: pino_1.default.stdSerializers.res
    },
    customLogLevel: function (res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
        }
        else if (res.statusCode >= 500 || err) {
            return 'error';
        }
        return 'info';
    },
    customSuccessMessage: function (res) {
        if (res.statusCode === 404) {
            return 'REQUEST NOT FOUND';
        }
        return 'REQUEST COMPLETED';
    },
    customErrorMessage: function (error, res) {
        return 'REQUEST ERRORED WITH STATUS CODE: ' + res.statusCode;
    },
    customAttributeKeys: {
        req: 'REQUEST',
        res: 'RESPONSE',
        err: 'ERROR',
        responseTime: 'TIME'
    },
});
exports.RequestLogger = RequestLogger;
//# sourceMappingURL=http-options.js.map