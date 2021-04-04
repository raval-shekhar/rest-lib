import { HttpStatus } from "../utils/http-status";
import { CustomError, ErrorSerializer } from "./CustomError";

export class DatabaseError extends CustomError {
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(message?: string) {
    super(message || 'Error Connecting Database')
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeError(): ErrorSerializer {
    return {
      statusCode: this.statusCode,
      message: this.message || 'Error Connecting Database'
    }
  }
}