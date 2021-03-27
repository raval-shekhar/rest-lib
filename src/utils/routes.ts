import { Router, Request, Response } from 'express';
import { Validate, ValidationSchema } from '../middleware/validate';
import { CatchAsync } from './asyncCatch';

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  USE = 'use',
  PURGE = 'purge'
}
export interface ApiRouter {
  validator?: ValidationSchema
  method: Methods;
  path: string;
  middlewares?: any[];
  router?: Router;
  controller?: (req: Request, res: Response) => Promise<any>;
}
export const MapRoutes = (routes: ApiRouter[]): Router => {
  const router = Router();
  for (const route of routes) {
    const middlewares: any[] = [];
    if (route.router) {
      middlewares.push(route.router);
    } else {
      if (route.validator) {
        middlewares.push(Validate(route.validator));
      }
      if (route.middlewares) {
        for (const mw of route.middlewares) {
          middlewares.push(mw);
        }
      }
      if (route.controller) {
        middlewares.push(CatchAsync(route.controller));
      }
    }
    router[route.method](route.path, ...middlewares);
  }
  return router;
}