import { HttpStatus } from "src/utils/http-status";
import { CustomError, ErrorSerializer } from "./CustomError";
export declare class DatabaseError extends CustomError {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR;
    constructor(message?: string);
    serializeError(): ErrorSerializer;
}
