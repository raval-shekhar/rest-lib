import { CustomError, ErrorSerializer } from "./CustomError";
export declare class ApiError extends CustomError {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string);
    serializeError(): ErrorSerializer;
}
