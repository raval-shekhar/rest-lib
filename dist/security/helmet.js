"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helmet = void 0;
const helmet_1 = __importDefault(require("helmet"));
const Helmet = (securityOptions) => {
    const directives = {
        defaultSrc: ["'self'", "'localhost:8000'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        sandbox: ['allow-forms', 'allow-scripts'],
        reportUri: '/report-violation',
        objectSrc: ["'none'"],
        upgradeInsecureRequests: true,
        workerSrc: false,
    };
    helmet_1.default({
        contentSecurityPolicy: (securityOptions ? securityOptions : directives),
        referrerPolicy: {
            policy: 'no-referrer',
        },
    });
    return helmet_1.default();
};
exports.Helmet = Helmet;
//# sourceMappingURL=helmet.js.map