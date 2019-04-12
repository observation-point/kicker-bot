import { Message } from 'discord.js';
import { BaseController } from '../../components/controller/BaseController';
import { CoreServiceWrapper } from '../../services/wrappers/CoreServiceWrapper';
import { coreService } from '../../services/wrappers';
import { User } from '../../services/user/User';

class MessageController extends BaseController {
    public static MESSAGES = {
        ADD_ME: 'add-me',
        STATS: 'stats',
        HELP: 'help'
    };
    private coreService: CoreServiceWrapper;

    constructor() {
        super();
        this.coreService = coreService;
    }

    public async actionGetHelp(message: Message): Promise<void> {
        await message.author.send(this.formatDefaultEmbedMessage(
            'Help',
            `* ${MessageController.MESSAGES.ADD_ME} - reg me as kicker user.\n` +
            `* ${MessageController.MESSAGES.STATS} - get stats.\n`
        ));
    }

    public async actionAddMe(message: Message): Promise<void> {
        const user = this.getUser(message);
        try {
            const result = await this.coreService.createUser(user);
            await message.channel.send(`${user.fullname} joined http://kicker.lan - glhf`);
            await message.author.send(`Your auth data: ${user.login}:${result.user.password}`);
            await message.author.send(`Yout link to join: http://kicker.lan/token/${result.user.token}`);
        } catch (error) {
            console.log(error);
            await message.channel.send(`${user.fullname} already http://kicker.lan member!`);
        }
    }

    public async actionGetStats(message: Message): Promise<void> {
        const user = this.getUser(message);

        await message.channel.send(`${user.fullname} joined \`kicker.lan\` - glhf`);
    }

    private getUser(message: Message): User {
        return {
            login: message.author.username.toLocaleLowerCase().split(' ').join('_'),
            fullname: message.author.username,
            avatar: message.author.avatarURL
        };
    }

    private formatDefaultEmbedMessage(title: string, description: string) {
        return {
            embed: {
                title,
                description,
                color: 14177041
            }
        }
    }
}

export { MessageController };