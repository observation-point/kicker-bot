import { configLoader } from './components/configLoader';
import { DiscordConfig } from './components/config';
import { DiscordClientWrapper } from './components/discord/DiscordClientWrapper';
import { messageHandler } from './contollers/discord-messages';

const botConfig = configLoader.getConfig<DiscordConfig>('discord');
const discordClient = new DiscordClientWrapper(botConfig.token, botConfig.name);

discordClient.use(messageHandler);
discordClient.initClient();
