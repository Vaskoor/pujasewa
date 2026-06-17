import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, json } = format;

const myFormat = printf(({ level, message, timestamp, context, trace }) => {
  return `${timestamp} [${context || 'App'}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
});

export const winstonLogger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat,
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), myFormat),
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

// Optional: Send errors to Sentry (if configured)
if (process.env.SENTRY_DSN) {
  const Sentry = require('@sentry/node');
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  // Use a custom transport instead of stream to avoid type issues
  class SentryTransport extends transports.Stream {
    constructor(opts?: any) {
      super({
        stream: {
          write: (message: string) => {
            Sentry.captureMessage(message, 'error');
            return true;
          },
        } as any,
        ...opts,
      });
    }
  }
  winstonLogger.add(new SentryTransport({ level: 'error' }));
}
