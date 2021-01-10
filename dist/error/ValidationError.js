"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const http_status_1 = require("src/utils/http-status");
const CustomError_1 = require("./CustomError");
class ValidationError extends CustomError_1.CustomError {
    constructor(errors) {
        super('Invalid Request Body');
        this.errors = errors;
        this.statusCode = http_status_1.HttpStatus.BAD_REQUEST;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    serializeError() {
        return {
            message: 'Validation Error',
            errors: this.errors.details.map(error => error.message)
        };
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map