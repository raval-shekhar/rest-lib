import { ValidationError as JoiValidationError } from 'joi';
import { HttpStatus } from 'src/utils/http-status';
import { CustomError, ErrorSerializer } from "./CustomError";
export declare class ValidationError extends CustomError {
    private errors;
    statusCode: HttpStatus;
    constructor(errors: JoiValidationError);
    serializeError(): ErrorSerializer;
}
