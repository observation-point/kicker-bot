import { Message } from 'discord.js';
import { BaseController } from '../../components/controller/BaseController';
import { CoreServiceWrapper } from '../../services/wrappers/CoreServiceWrapper';
import { coreService } from '../../services/wrappers';
import { DiscordService } from '../../services/discord/DiscordService';

class MessageController extends BaseController {
    public static MESSAGES = {
        ADD_ME: 'add',
        STATS: 'stats',
        HELP: 'help'
    };
    private coreService: CoreServiceWrapper;
    private discordService: DiscordService;

    constructor() {
        super();
        this.coreService = coreService;
        this.discordService = new DiscordService();
    }

    public async actionGetHelp(message: Message): Promise<void> {
        await message.author.send(this.discordService.createDefaultEmbedMessage(
            'Help',
            `* ${MessageController.MESSAGES.ADD_ME} - reg me as kicker user.\n` +
            `* ${MessageController.MESSAGES.STATS} - get stats.\n`
        ));
    }

    public async actionAddMe(message: Message): Promise<void> {
        const user = this.discordService.getUser(message);
        try {
            const result = await this.coreService.createUser(user);
            if (result.user.password) {
                await message.channel.send(`${user.fullname} joined https://kicker.lan - glhf`);
                await message.author.send(`Your auth data: ${user.login}:${result.user.password}`);
            } else {
                await message.channel.send(`${user.fullname} already https://kicker.lan member!`);
            }
            await message.author.send(`Yout link to join: https://kicker.lan/token/${result.user.token}`);
        } catch (error) {
            console.log(error);
            await message.channel.send(`${user.fullname} already https://kicker.lan member!`);
        }
    }

    public async actionGetStats(message: Message): Promise<void> {
        const userLogin = message.content.split(' ')[2];
        const user = userLogin ? { login: userLogin } :  this.discordService.getUser(message);
        try {
            const stats = await this.coreService.getStats(user.login);
            await message.channel.send(this.discordService.createStatisticsMessage(user, stats));
        } catch (error) {
            console.error(error);
            await message.channel.send(`__${userLogin}__ not found!`);
        }
    }
}

export { MessageController };
