import pino from 'pino';
import os from 'os';

const Pino = (filename: string, prettyPrint: boolean): pino.Logger => {
  return pino({
    level: process.env.LEVEL,
    name: process.env.APP_NAME,
    messageKey: 'message',
    base: {
      pid: process.pid,
      host: os.hostname,
      filename: filename,
      app: process.env.APP_NAME
    },
    prettifier: prettyPrint,
    prettyPrint: prettyPrint ? {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss.l',
      crlf: true,
      ignore: 'pid,filename,app,message',
      messageFormat: '[{filename}] - {message}'
    } : false,
    enabled: true,
    formatters: {
      level: (level, number) => {
        return { level: level, number };
      },
    }
  });
}
export default Pino;