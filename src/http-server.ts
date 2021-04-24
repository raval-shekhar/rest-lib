import http from 'http';
import { Logger } from './logger/logger';

import Application from './rest-server';
import { ApiRouter } from './utils/routes';

interface RouterOptions {
  prefix: string,
  router: ApiRouter[]
}

interface ServerOptions {
  port: number;
  service: string;
  router: RouterOptions,
}
/**
 * Bootstrap Express Application Server
 * 
 * @param {number} port - Application Port
 * @param {RouterOptions} router - Express Router
 * @param {CorsSecurityOptions} cors - Cors Security Options
 * @param {SecurityPolicy} securityOptions - Helmet Security Options
 */
export const BootstrapServer = (options: ServerOptions): Promise<void> => {
  const { port, service, router } = options;

  process.env.APP_NAME = service;
  const logger = new Logger('SERVER');
  const app = new Application();
  const server = http.createServer(app.express);
  
  /**
   * Set Application middleware
   */
  app.requestLogger();
  app.setRoute(router.prefix, router.router);
  app.catchErrors();

  /**
   * Listen to specified port
   */
  server.listen(port);

  /**
   * Bootstrap HTTP server with specified options
   * @return {Promise} - Bootstrap Server
   */
  return new Promise((resolve, reject) => {
    /**
     * Listen to server event
     */
    server.on('listening', () => {
      logger.info(`${'REST'} server is listening to ${port}`);
      resolve();
    });
    /**
     * Error while booting server
     * @param {Error} error - Error while bootstraping server
     */
    const onError = (error: Error | any) => {
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
    server.on('error', onError);
  });
};
