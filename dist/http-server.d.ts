import { Router } from "express";
import { SecurityPolicy } from "./security/helmet-options";
interface RouterOptions {
    prefix: string;
    router: Router;
}
export declare const BootstrapServer: (port: number, router: RouterOptions, securityOptions?: SecurityPolicy) => Promise<void>;
export {};
