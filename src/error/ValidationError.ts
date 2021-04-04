import { ValidationError as JoiValidationError } from 'joi';
import { HttpStatus } from "../utils/http-status";
import { CustomError, ErrorSerializer } from "./CustomError";

interface ErrorMetadata {
  message: string;
  path: Array<string | number>;
  type: string;
}
export class ValidationError extends CustomError {
  statusCode: number = HttpStatus.BAD_REQUEST;
  constructor(private errors: JoiValidationError) {
    super('Invalid Request Body');
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
  serializeError(): ErrorSerializer {
    return {
      statusCode: this.statusCode,
      message: 'Validation Error',
      errors: this.errors.details.map((error: ErrorMetadata) => {
        return {
          message: error.message,
          path: error.path
        }
      })
    }
  }
}