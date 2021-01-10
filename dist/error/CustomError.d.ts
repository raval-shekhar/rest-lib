export interface ErrorSerializer {
    message: string;
    errors?: any[];
}
export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: any);
    abstract serializeError(): ErrorSerializer;
}
