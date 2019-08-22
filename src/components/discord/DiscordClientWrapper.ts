import { Client, Message } from 'discord.js';
import { MessageHandler } from './MessageHandler';
import { ILogger, DiscordLogger } from '../log';
import * as util from 'util';

class DiscordClientWrapper {
  private token: string;
  private clientName: string;
  private client: Client;
  private logger: ILogger;

  constructor(token: string, name: string) {
    this.client = new Client();
    this.token = token;
    this.logger = DiscordLogger;
    this.clientName = name;

    this.client.on('ready', () => {
      this.logger.info(`Bot - ${this.clientName} - is ready!`);
    });
  }

  public use(messageHandler: MessageHandler) {
    const clientNameRegExp = new RegExp(`^${this.clientName}(\s)?`);
    this.client.on('message', async(message: Message) => {
      if (message.content.match(clientNameRegExp)) {
        const commandName = message.content.split(' ')[1];
        if (messageHandler.eventNameList.includes(commandName) && commandName !== 'on') {

          const startTime = Date.now();
          const isComplete = await (messageHandler[commandName] as Function)(message);
          const measuredTime = Date.now() - startTime;

          const logLevel = isComplete === false ? 'warn' : 'info';

          this.logger[logLevel](
                        util.format('message - %s - "%s" to %s -- %d ms\n',
                                    commandName.toUpperCase(),
                                    message.content,
                                    message.author.username,
                                    measuredTime
                    ));
        }
      }
    });
  }

  public async initClient(): Promise<void> {
    await this.client.login(this.token);
  }
}

export { DiscordClientWrapper };
