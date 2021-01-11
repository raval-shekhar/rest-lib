import { HttpStatus } from "../utils/http-status";
import { CustomError, ErrorSerializer } from "./CustomError";

export class InternalServerError extends CustomError {
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(message?: string) {
    super(message || 'Internal Server Error Occured');
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
  serializeError(): ErrorSerializer {
    return {
      message: this.message || 'Internal Server Error Occured',
    }
  }
}