import { HttpStatus } from "../utils/http-status";
import { CustomError, ErrorSerializer } from "./CustomError";

export class BadRequest extends CustomError {
  statusCode = HttpStatus.BAD_REQUEST;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
  serializeError(): ErrorSerializer {
    return {
      message: this.message
    }
  }
}