import express, { Application, Router } from 'express';
import Compression from 'compression';

import { ErrorConverter, ErrorHandler, RouteNotFound } from './middleware/error';
import { Helmet } from './security/helmet';
import { SecurityPolicy } from './security/helmet-options';
import { RequestLogger } from './logger/http-options';
import { Cors, CorsSecurityOptions } from './security/cors';
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
	}
	/**
	 * Prints Coloured log in development and json in production
	 * @param {boolean} preetyPrint - print log in preety mode
	 */
	public requestLogger(): void {
		this.express.use(RequestLogger())
	}
	/**
	 * Helmet Setup
	 * @param {SecurityPolicy} helmetOptions - Helmet Security options
	 */
	public setHelmet(securityOptions?: SecurityPolicy): void {
		this.express.use(Helmet(securityOptions))
	}
	/**
	 * Cors Setup
	 * @param {CorsSecurityOptions} corsOptions - Cors Security options
	 */
	public setCors(corsOptions: CorsSecurityOptions): void {
		this.express.use(Cors(corsOptions));
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