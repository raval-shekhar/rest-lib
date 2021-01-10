"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const http_status_1 = require("src/utils/http-status");
const CustomError_1 = require("./CustomError");
class InternalServerError extends CustomError_1.CustomError {
    constructor(message) {
        super(message || 'Internal Server Error Occured');
        this.statusCode = http_status_1.HttpStatus.INTERNAL_SERVER_ERROR;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
    serializeError() {
        return {
            message: this.message || 'Internal Server Error Occured',
        };
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=InternalServerError.js.map