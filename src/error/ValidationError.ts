import { ValidationError as JoiValidationError } from 'joi';
import { HttpStatus } from 'src/utils/http-status';
import { CustomError, ErrorSerializer } from "./CustomError";

export class ValidationError extends CustomError {
  statusCode = HttpStatus.BAD_REQUEST;
  constructor(private errors: JoiValidationError) {
    super('Invalid Request Body');
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
  serializeError(): ErrorSerializer {
    return {
      message: 'Validation Error',
      errors: this.errors.details.map(error => error.message)
    } 
  }
}