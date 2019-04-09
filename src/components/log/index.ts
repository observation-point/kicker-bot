import { LoggerFactory, LoggerConfig } from './LoggerFactory';
import { configLoader } from '../configLoader';

type FullConfig = {
    application: LoggerConfig;
    discord: LoggerConfig;
    access: LoggerConfig;
};

const config = configLoader.getConfig<FullConfig>('logging');

const AppLogger = LoggerFactory.create(config.application);
const MainLogger = LoggerFactory.create(config.access);
const DiscordLogger = LoggerFactory.create(config.discord);


export { ILogger } from './ILogger';
export {
    AppLogger,
    MainLogger,
    DiscordLogger
};
