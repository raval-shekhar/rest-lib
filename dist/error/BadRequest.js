"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const http_status_1 = require("../utils/http-status");
const CustomError_1 = require("./CustomError");
class BadRequest extends CustomError_1.CustomError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_1.HttpStatus.BAD_REQUEST;
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
    serializeError() {
        return {
            message: this.message
        };
    }
}
exports.BadRequest = BadRequest;
//# sourceMappingURL=BadRequest.js.map