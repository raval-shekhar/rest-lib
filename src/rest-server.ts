import express, { Application, Router } from 'express';
import Compression from 'compression';

import { ErrorConverter, ErrorHandler, RouteNotFound } from './middleware/error';
import { Helmet } from './security/helmet';
import { SecurityPolicy } from './security/helmet-options';
import { RequestLogger } from './logger/http-options';

export class RestServer {
	public express: Application;

	constructor() {
		this.express = express();
		this.setMiddleware();
	}
	
	private setMiddleware(): void {
		this.express.use(Compression());
	}

	public requestLogger(preetyPrint: boolean): void {
		this.express.use(RequestLogger(preetyPrint))
	}

	public setHelmet(securityOptions?: SecurityPolicy): void {
		this.express.use(Helmet(securityOptions))
	}

	public setRoute(prefix: string, router: Router): void {
		this.express.use(prefix, router);
	}

	public catchErrors(): void {
		this.express.use(RouteNotFound)
		this.express.use(ErrorConverter);
		this.express.use(ErrorHandler);
	} 
}

export default RestServer;