import { ApiRouter, BootstrapServer, Methods } from '../src/index';
import { AuthRoutes } from './router';

const baseRoutes: ApiRouter[] = [
  {
    path: '/auth',
    method: Methods.USE,
    router: AuthRoutes
  }
]
BootstrapServer(8000,
  { prefix: '/api', router: baseRoutes },
  {
    allowedHeaders: [],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    whitelist: ['*']
  }
).then(() => {

});