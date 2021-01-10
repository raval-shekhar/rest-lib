import { NextFunction, Request, Response } from "express";
import { ApiError } from "src/error/ApiError";
import { NotFound } from "src/error/NotFound";
import { CustomError } from "../error/CustomError";
import { HttpStatus } from "../utils/http-status";

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeError());
  }
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
};

export const ErrorConverter = (err, req: Request, res: Response, next: NextFunction) => {
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