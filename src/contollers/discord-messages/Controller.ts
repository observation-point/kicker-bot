import { Message } from 'discord.js';
import { BaseController } from '../../components/controller/BaseController';

class MessageController extends BaseController {
    public static MESSAGES = {
        ADD_ME: 'add-me',
        STATS: 'stats',
        HELP: 'help'
    };

    public async actionGetHelp(message: Message): Promise<void> {
        console.log(message.author);

        await message.author.send(this.formatDefaultEmbedMessage(
            'Help',
            `* ${MessageController.MESSAGES.ADD_ME} - reg me as kicker user.\n` +
            `* ${MessageController.MESSAGES.STATS} - get stats.\n`
        ));
    }

    public async actionAddMe(message: Message): Promise<void> {
        const user = {
            login: message.author.username.split('.')[0],
            fullname: message.author.username,
            avatar: message.author.avatarURL
        };

        await message.channel.send(`${user.fullname} joined \`kicker.lan\` - glhf`);
        await message.author.send(`Your auth data: ${user.login}:123456`);
    }

    public async actionGetStats(message: Message): Promise<void> {
        const user = {
            login: message.author.username.split('.')[0],
            fullname: message.author.username,
            avatar: message.author.avatarURL
        };

        await message.channel.send(`${user.fullname} joined \`kicker.lan\` - glhf`);
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