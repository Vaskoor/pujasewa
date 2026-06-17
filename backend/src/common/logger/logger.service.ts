import { Injectable, LoggerService } from '@nestjs/common';
import { winstonLogger } from './winston.logger';

@Injectable() // No scope – singleton
export class CustomLogger implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  log(message: any, ...optionalParams: any[]) {
    winstonLogger.info(message, { context: this.context, ...this.parseParams(optionalParams) });
  }

  error(message: any, trace?: string, ...optionalParams: any[]) {
    winstonLogger.error(message, { context: this.context, trace, ...this.parseParams(optionalParams) });
  }

  warn(message: any, ...optionalParams: any[]) {
    winstonLogger.warn(message, { context: this.context, ...this.parseParams(optionalParams) });
  }

  debug(message: any, ...optionalParams: any[]) {
    winstonLogger.debug(message, { context: this.context, ...this.parseParams(optionalParams) });
  }

  verbose(message: any, ...optionalParams: any[]) {
    winstonLogger.verbose(message, { context: this.context, ...this.parseParams(optionalParams) });
  }

  private parseParams(params: any[]) {
    if (params.length && typeof params[0] === 'object') {
      return params[0];
    }
    return {};
  }
}
