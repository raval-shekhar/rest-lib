import express, { Application } from 'express';
import Compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { ExpressLogger } from '@shekhar.raval/logger';

import { ErrorConverter, ErrorHandler, RouteNotFound } from './middleware/error';

import { ApiRouter, MapRoutes } from './utils/routes';

/**
 * Create Rest server instance
 * @class {Rest Server}
 */
export class RestServer {
	public express: Application;

	constructor() {
		this.express = express();
		this.setMiddleware();
	}
	/**
	 * Setup Express JSON and Compression Middleware
	 */
	private setMiddleware(): void {
		this.express.use(express.json())
		this.express.use(Compression());
		this.express.use(cors());
		this.express.use(helmet());
	}
	/**
	 * Prints Coloured log in development and json in production
	 */
	public requestLogger(): void {
		this.express.use(ExpressLogger())
	}

	/**
	 * Setup Express Routing
	 * @param {string} prefix - Route prefix
	 * @param {Router} router - Express Router
	 */
	public setRoute(prefix: string, router: ApiRouter[]): void {
		this.express.use(prefix, MapRoutes(router));
	}
	/**
	 * Error Handlers
	 */
	public catchErrors(): void {
		this.express.use(RouteNotFound)
		this.express.use(ErrorConverter);
		this.express.use(ErrorHandler);
	}
}

export default RestServer;