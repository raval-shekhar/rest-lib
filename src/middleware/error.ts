import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/ApiError";
import { NotFound } from "../error/NotFound";
import { CustomError } from "../error/CustomError";
import { HttpStatus } from "../utils/http-status";

export const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.statusCode).json(err.serializeError());
};

export const ErrorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof CustomError)) {
    const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Something went Wrong';
    error = new ApiError(statusCode, message);
  }
  next(error);
};

export const RouteNotFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new NotFound('Resource you are looking for Not Found');
  return ErrorHandler(err, req, res, next);
}