import cls from 'cls-hooked';
import { v4 as uuid4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

const store = cls.createNamespace(`tarce-ms-id`);
const KEY = 'trace-id-key';
const USER_ID = 'request-user-id';

const withId = (fun: Function, id: string | undefined): void => {
  store.run(() => {
    store.set(KEY, id || uuid4());
    fun();
  });
};

const withUser = (fun: Function, id: string | string[] | undefined): void => {
  store.run(() => {
    store.set(USER_ID, id || null);
    fun();
  });
};

export const getTraceId = () => store.get(KEY);
export const getUserId = () =>  store.get(USER_ID);

export const CorrelationMiddleware = () => (req: Request, res: Response, next: NextFunction): void => {
  store.bindEmitter(req);
  store.bindEmitter(res);
  store.bindEmitter(req.socket);
  withId(() => {
    const currentTraceId = getTraceId();
    res.set('x-request-id', currentTraceId);
    withUser(() => {
      const currentUser = getUserId();
      res.set('user-id', currentUser);
      next();
    }, (req.get('user-id')))
  }, (req.get('x-request-id')));
};