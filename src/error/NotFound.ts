import { HttpStatus } from "src/utils/http-status";
import { CustomError, ErrorSerializer } from "./CustomError";

export class NotFound extends CustomError {
  statusCode = HttpStatus.NOT_FOUND;
  constructor(message?: string) {
    super(message || 'Resource not found');
    Object.setPrototypeOf(this, NotFound.prototype);
  }
  serializeError(): ErrorSerializer {
    return {
      message: this.message || 'Resource not found',
    }
  }
}