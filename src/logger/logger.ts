import logger from './config';

export class Logger {
  logger: any;
  constructor(filename: string) {
    this.logger = logger(filename.toUpperCase());
  }

  /**
   * Information log
   * 
   * @param {string} message - message
   * @param {object} object - info object 
   */
  info(message: string, object: Record<string, any> = {}) {
    if (Object.keys(object).length > 0) {
      this.logger.info(message, object);
    } else {
      this.logger.info(message);
    }
  }

  /**
   * Error log
   * 
   * @param {string} message - message
   * @param {object} object - info object 
   */
  error(message: string, object: Record<string, any> = {}) {
    if (Object.keys(object).length > 0) {
      this.logger.error(message, object);
    } else {
      this.logger.error(message);
    }
  }

  /**
   * Warning log
   * 
   * @param {string} message - message
   * @param {object} object - info object 
   */
  warn(message: string, object: Record<string, any> = {}) {
    if (Object.keys(object).length > 0) {
      this.logger.warn(message, object);
    } else {
      this.logger.warn(message);
    }
  }

  /**
   * Debug log
   * 
   * @param {string} message - message
   * @param {object} object - info object 
   */
  debug(message: string, object: Record<string, any> = {}) {
    if (Object.keys(object).length > 0) {
      this.logger.debug(message, object);
    } else {
      this.logger.debug(message);
    }
  }
}