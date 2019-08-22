import { LoggerConfig } from '../log/LoggerFactory';

export type DiscordConfig = {
  name: string;
  token: string;
};

type ServiceConfig = {
  path: string;
  token?: string;
};

export type ServicesConfig = {
  core: ServiceConfig;
};

export type LoggingConfig = {
  application: LoggerConfig;
  discord: LoggerConfig;
  access: LoggerConfig;
};
