import cors, { CorsOptions } from "cors";

export interface CorsSecurityOptions {
  whitelist: string[];
  allowedHeaders: string[];
  methods?: string[];
  exposedHeaders?: string[];
}
export const Cors = (options: CorsSecurityOptions) => {
  const corsOptions: CorsOptions = {
    optionsSuccessStatus: 200,
    allowedHeaders: options.allowedHeaders,
    origin: (origin, callback) => {
      if (!origin || options.whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
  options.methods && (corsOptions.methods = options.methods);
  options.exposedHeaders && (corsOptions.exposedHeaders = options.exposedHeaders);
  return cors(corsOptions);
}