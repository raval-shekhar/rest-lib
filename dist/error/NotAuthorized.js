"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorized = void 0;
const http_status_1 = require("src/utils/http-status");
const CustomError_1 = require("./CustomError");
class NotAuthorized extends CustomError_1.CustomError {
    constructor(message) {
        super(message || 'Not Authorized to access resource');
        this.statusCode = http_status_1.HttpStatus.UNAUTHORIZED;
        Object.setPrototypeOf(this, NotAuthorized.prototype);
    }
    serializeError() {
        return {
            message: this.message || 'Not Authorized to access resource'
        };
    }
}
exports.NotAuthorized = NotAuthorized;
//# sourceMappingURL=NotAuthorized.js.map