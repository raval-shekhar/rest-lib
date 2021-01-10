export interface SecurityPolicy {
  defaultSrc: string[],
  scriptSrc: string[],
  sandbox: string[],
  reportUri: string,
  objectSrc: string[],
  upgradeInsecureRequests: boolean,
  workerSrc: boolean;
}