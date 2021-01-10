import { Router } from "express";
import http from 'http';

import Application from './rest-server';
import { SecurityPolicy } from "./security/helmet-options";
import { Logger } from "./logger/logger";

interface RouterOptions {
  prefix: string,
  router: Router
}

/**
 * Bootstrap Express Application Server
 * 
 * @param {number} port - Application Port
 * @param {Router} router - Express Router 
 * @param {boolean} preetyPrint - Preety print Logs
 * @param {SecurityPolicy} securityOptions - Helmet Security Options
 */
export const BootstrapServer = (
  port: number,
  router: RouterOptions,
  securityOptions?: SecurityPolicy): Promise<void> => {
  const app = new Application();
  if(typeof process.env.APP_NAME === 'undefined' && typeof process.env.NODE_ENV === 'undefined') {
    throw Error('Please specify NODE_ENV and APP_NAME in environment');
  }
  const logger = new Logger('SERVER');
  const server = http.createServer(app.express);
  app.setHelmet(securityOptions);
  app.requestLogger(process.env.NODE_ENV == 'development')
  app.setRoute(router.prefix, router.router);
  app.catchErrors();

  server.listen(port);
  return new Promise((resolve, reject) => {
    server.on('listening', () => {
      logger.debug(`${process.env.NODE_ENV.toUpperCase()} server is listening to ${port}`);
      resolve();
    });
    const onError = (error) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
      switch (error.code) {
        case 'EACCES':
          logger.error(`${bind} requires elevated privileges`);
          reject();
          break;
        case 'EADDRINUSE':
          logger.error(`${bind} is already in use`);
          reject();
        default:
          throw error;
      }
    };
    server.on('error',onError);
  });
};
