"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const CustomError_1 = require("./CustomError");
class DatabaseError extends CustomError_1.CustomError {
    constructor(message) {
        super(message || 'Error Connecting Database');
        Object.setPrototypeOf(this, DatabaseError);
    }
    serializeError() {
        return {
            message: this.message || 'Error Connecting Database'
        };
    }
}
exports.DatabaseError = DatabaseError;
//# sourceMappingURL=DatabaseError.js.map