import helmet from 'helmet';

import { SecurityPolicy } from "./helmet-options";

export const Helmet = (securityOptions?: SecurityPolicy) => {
  const directives = {
    scriptSrc: ["'self'", "'unsafe-inline'"],
    sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/report-violation',
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true,
    workerSrc: false,
  }
  helmet({
    contentSecurityPolicy: (securityOptions ? securityOptions : directives) as any,
    referrerPolicy: {
      policy: 'no-referrer',
    },
  })
  return helmet();
}