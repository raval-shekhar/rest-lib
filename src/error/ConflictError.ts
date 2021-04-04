import { HttpStatus } from "../utils/http-status";
import { CustomError, ErrorSerializer } from "./CustomError";

export class ConflictError extends CustomError {
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
  serializeError(): ErrorSerializer {
    return {
      statusCode: this.statusCode,
      message: this.message,
    }
  }
}