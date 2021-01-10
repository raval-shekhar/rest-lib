/// <reference types="node" />
/// <reference types="pino-http" />
import { SecurityPolicy } from "./helmet-options";
export declare const Helmet: (securityOptions?: SecurityPolicy) => (req: import("http").IncomingMessage, res: import("http").ServerResponse, next: (err?: unknown) => void) => void;
