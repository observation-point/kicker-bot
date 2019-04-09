import { LoggingConfig } from '../config';
import { LoggerFactory } from './LoggerFactory';
import { configLoader } from '../configLoader';


const config = configLoader.getConfig<LoggingConfig>('logging');

const AppLogger = LoggerFactory.create(config.application);
const MainLogger = LoggerFactory.create(config.access);
const DiscordLogger = LoggerFactory.create(config.discord);


export { ILogger } from './ILogger';
export {
    AppLogger,
    MainLogger,
    DiscordLogger
};
