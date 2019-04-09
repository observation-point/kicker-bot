import * as pino from 'pino';
import { ILogger } from './ILogger';

export type LoggerConfig = {
  level: string;
  name: string;
};

export class LoggerFactory {
  public static create(config: LoggerConfig): ILogger {
    return pino(config);
  }
}
