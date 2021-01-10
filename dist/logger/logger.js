"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const config_1 = __importDefault(require("./config"));
class Logger {
    constructor(filename, preetyPrint = process.env.NODE_ENV === 'development') {
        this.logger = config_1.default(filename, preetyPrint);
    }
    info(message, object = {}) {
        if (Object.keys(object).length > 0) {
            this.logger.info(message, object);
        }
        else {
            this.logger.info(message);
        }
    }
    error(message, object = {}) {
        if (Object.keys(object).length > 0) {
            this.logger.error(message, object);
        }
        else {
            this.logger.error(message);
        }
    }
    warn(message, object = {}) {
        if (Object.keys(object).length > 0) {
            this.logger.warn(message, object);
        }
        else {
            this.logger.warn(message);
        }
    }
    debug(message, object = {}) {
        if (Object.keys(object).length > 0) {
            this.logger.debug(message, object);
        }
        else {
            this.logger.debug(message);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map