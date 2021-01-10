import PinoRequest from 'pino-http';
import pino from 'pino';

import PinoLogger from './config';

export const RequestLogger = (preetyPrint: boolean) => PinoRequest({
  logger: PinoLogger('HTTP', preetyPrint),

  // Define custom serializers
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res
  },

  // Log level as per status code
  customLogLevel: function (res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn'
    } else if (res.statusCode >= 500 || err) {
      return 'error'
    }
    return 'info'
  },

  // Request Success message
  customSuccessMessage: function (res) {
    if (res.statusCode === 404) {
      return 'REQUEST NOT FOUND'
    }
    return 'REQUEST COMPLETED'
  },

  // Request Error message
  customErrorMessage: function (error, res) {
    return 'REQUEST ERRORED WITH STATUS CODE: ' + res.statusCode
  },

  // Request Attributes
  customAttributeKeys: {
    req: 'REQUEST',
    res: 'RESPONSE',
    err: 'ERROR',
    responseTime: 'TIME'
  },
});