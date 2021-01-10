import { HttpStatus } from 'src/utils/http-status';
import { CustomError, ErrorSerializer } from "./CustomError";

export class NotAuthorized extends CustomError {
  statusCode = HttpStatus.UNAUTHORIZED;
  constructor(message?: string) {
    super(message || 'Not Authorized to access resource');
    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }
  serializeError(): ErrorSerializer {
    return {
      message: this.message || 'Not Authorized to access resource'
    } 
  }
}