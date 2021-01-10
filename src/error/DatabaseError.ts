import { HttpStatus } from "src/utils/http-status";
import { CustomError, ErrorSerializer } from "./CustomError";

export class DatabaseError extends CustomError {
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(message?: string) {
    super(message || 'Error Connecting Database')
    Object.setPrototypeOf(this, DatabaseError);
  }

  serializeError(): ErrorSerializer {
    return {
      message: this.message || 'Error Connecting Database'
    }
  }
  
}