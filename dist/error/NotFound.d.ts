import { HttpStatus } from "../utils/http-status";
import { CustomError, ErrorSerializer } from "./CustomError";
export declare class NotFound extends CustomError {
    statusCode: HttpStatus;
    constructor(message?: string);
    serializeError(): ErrorSerializer;
}
