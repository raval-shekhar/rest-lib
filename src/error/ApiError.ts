import { CustomError, ErrorSerializer } from "./CustomError";

export class ApiError extends CustomError {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    statusCode = this.statusCode;
    message = this.message;
    Object.setPrototypeOf(this, ApiError);
  }
  serializeError(): ErrorSerializer {
    return {
      message: this.message,
    }
  }
}