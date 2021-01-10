import { Application, Router } from 'express';
import { SecurityPolicy } from './security/helmet-options';
export declare class RestServer {
    express: Application;
    constructor();
    private setMiddleware;
    requestLogger(preetyPrint: boolean): void;
    setHelmet(securityOptions?: SecurityPolicy): void;
    setRoute(prefix: string, router: Router): void;
    catchErrors(): void;
}
export default RestServer;
