"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const CustomError_1 = require("./CustomError");
class ApiError extends CustomError_1.CustomError {
    constructor(statusCode, message) {
        super(message);
        statusCode = this.statusCode;
        message = this.message;
        Object.setPrototypeOf(this, ApiError);
    }
    serializeError() {
        return {
            message: this.message,
        };
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map