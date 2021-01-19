import { Request, Response, NextFunction } from 'express';

export const CatchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction): Promise<any> => {
  return Promise.resolve(fn(req, res, next)).catch((err) => next(err));
}