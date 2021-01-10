import { HttpStatus } from "src/utils/http-status";
import { CustomError, ErrorSerializer } from "./CustomError";
export declare class InternalServerError extends CustomError {
    statusCode: HttpStatus;
    constructor(message?: string);
    serializeError(): ErrorSerializer;
}
