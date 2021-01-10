"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const http_status_1 = require("src/utils/http-status");
const CustomError_1 = require("./CustomError");
class NotFound extends CustomError_1.CustomError {
    constructor(message) {
        super(message || 'Resource not found');
        this.statusCode = http_status_1.HttpStatus.NOT_FOUND;
        Object.setPrototypeOf(this, NotFound.prototype);
    }
    serializeError() {
        return {
            message: this.message || 'Resource not found',
        };
    }
}
exports.NotFound = NotFound;
//# sourceMappingURL=NotFound.js.map