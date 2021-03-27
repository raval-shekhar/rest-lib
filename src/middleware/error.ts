import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/ApiError";
import { NotFound } from "../error/NotFound";
import { CustomError } from "../error/CustomError";
import { HttpStatus } from "../utils/http-status";

export const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeError());
  }
  return res.status(err.statusCode).json({ message: err.message });
};

export const ErrorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error: Record<any, any> = {};
  if (!(error instanceof CustomError)) {
    error.statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    error.message = err.message || 'Something went Wrong';
  }
  return ErrorHandler(error, req, res, next);
};

export const RouteNotFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new NotFound('Resource you are looking for Not Found');
  return ErrorHandler(err, req, res, next);
}