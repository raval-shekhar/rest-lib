import { NextFunction, Request, Response } from "express";
export declare const ErrorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any>;
export declare const ErrorConverter: (err: any, req: Request, res: Response, next: NextFunction) => void;
export declare const RouteNotFound: (req: Request, res: Response, next: NextFunction) => Response<any>;
