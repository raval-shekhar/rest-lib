export declare class Logger {
    logger: any;
    constructor(filename: string, preetyPrint?: boolean);
    info(message: string, object?: Record<string, any>): void;
    error(message: string, object?: Record<string, any>): void;
    warn(message: string, object?: Record<string, any>): void;
    debug(message: string, object?: Record<string, any>): void;
}
