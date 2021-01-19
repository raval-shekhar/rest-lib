import { Router, Request, Response, NextFunction } from "express";

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  USE = 'use',
  PURGE = 'purge'
}
export interface ApiRouter {
  validator?: (req: Request, res: Response, next: NextFunction) => void;
  method: Methods;
  path: string;
  middlewares?: any[];
  router?: Router;
  controller?: (req: Request, res: Response, next: NextFunction) => void;
}
export const MapRoutes = (routes: ApiRouter[]): Router => {
  const router = Router();
  for (const route of routes) {
    const middlewares: any[] = [];
    if (route.router) {
      middlewares.push(route.router);
    } else {
      if (route.validator) {
        middlewares.push(route.validator);
      }
      if (route.middlewares) {
        for (const mw of route.middlewares) {
          middlewares.push(mw);
        }
      }
      if (route.controller) {
        middlewares.push(route.controller);
      }
    }
    router[route.method](route.path, ...middlewares);
  }
  return router;
}