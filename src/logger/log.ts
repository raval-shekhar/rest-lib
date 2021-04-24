import pino from 'pino';
import os from 'os';

import { getTraceId, getUserId } from './correlation';

const Pino = (filename: string): pino.Logger => {
  return pino({
    level: process.env.LOG_LEVEL,
    name: process.env.APP_NAME,
    messageKey: 'message',
    base: {
      pid: process.pid,
      host: os.hostname(),
      context: filename
    },
    prettifier: true,
    prettyPrint: process.env.NODE_ENV === 'production' ? false : {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss.l',
      crlf: true,
      ignore: 'pid,context,traceId,message,name,host,err',
      messageFormat: (log: any) => {
        return `(${log.pid} on ${log.host}) [${log.name}/${log.context}] [traceId=${log.traceId}, userId=${log.userId}] - ${log.message}`
      }
    },
    enabled: true,
    formatters: {
      level: (level: string, number: number) => {
        return { level: level, number };
      },
    },
    mixin: () => {
      return { 
        traceId: getTraceId(),
        userId: getUserId(),
      }
    }
  });
}
export default Pino;