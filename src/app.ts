import { configLoader } from './components/configLoader';
import { DiscordClientWrapper } from './components/discord/DiscordClientWrapper';
import { messageHandler } from './contollers/discord-messages';

const botConfig = configLoader.getConfig<{ token: string; name: string; }>('discord');
const discordClient = new DiscordClientWrapper(botConfig.token, botConfig.name);


discordClient.use(messageHandler);
discordClient.initClient();