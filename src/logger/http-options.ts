import PinoRequest from 'pino-http';
import pino from 'pino';

import PinoLogger from './config';


export const RequestLogger = () => PinoRequest({
  logger: PinoLogger('HTTP'),

  // Define custom serializers
  serializers: {
    err: pino.stdSerializers.err,
    req: (req) => {
      let ipAddress;
      const forwardedIpsStr = req.headers['x-forwarded-for'];
      if (forwardedIpsStr) {
        const forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
      }
      if (!ipAddress) {
        ipAddress = req.remoteAddress;
      }
      const { method, url, headers: { host } } = req;
      return { method, host, url, ip: ipAddress }
    },
    res: (res) => {
      return { status: res.statusCode }
    }
  },

  // Log level as per status code
  customLogLevel: function (res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'error'
    } else if (res.statusCode >= 500 || err) {
      return 'warn'
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