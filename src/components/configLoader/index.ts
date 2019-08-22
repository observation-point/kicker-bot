import { resolve } from 'path';
import { AppConfigLoader } from './AppConfigLoader';

const env = process.env.DISCORD_KICKER_BOT_ENV;
if (!env) {
  throw new Error('DISCORD_KICKER_BOT_ENV is not defined');
}

export const configLoader = new AppConfigLoader(
    resolve(__dirname, '../../../config', env)
);
