import { HttpStatus } from '../utils/http-status';
import { CustomError, ErrorSerializer } from "./CustomError";

export class ApiError extends CustomError {
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
  message: string = '';
  constructor(statusCode: number, message: string) {
    super(message);
    statusCode = this.statusCode;
    message = this.message;
    Object.setPrototypeOf(this, ApiError);
  }
  serializeError(): ErrorSerializer {
    return {
      statusCode: this.statusCode,
      message: this.message,
    }
  }
}