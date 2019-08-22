import { Message } from 'discord.js';
import { UserStats } from '@kicker/core';
import { round } from '../../components/utils/math';
import { User } from '../user/User';

class DiscordService {
  public static DEFAULT_AVATAR_URL: string = 'https://cdn.discordapp.com/embed/avatars/0.png';

  public getUser(message: Message): User {
    return {
      login: message.author.username.toLocaleLowerCase().split(' ').join('_'),
      fullname: message.author.username,
      avatar: message.author.avatarURL
    };
  }

  public createDefaultEmbedMessage(title: string, description: string) {
    return {
      embed: {
        title,
        description,
        color: 14177041
      }
    };
  }

  public createStatisticsMessage(user: { login: string; }, rawData: UserStats) {
    const winCount = rawData.winsInAttack + rawData.winsInDefense;
    const lossCount = rawData.gamesCount - winCount;
    const winrate = round((winCount / (lossCount || 1)) * 100, 2);
    return {
      embed: {
        description: 'Ranked information',
        color: 12026300,
        timestamp: new Date(),
        footer: {
          text: 'Play ranked games with kicker.lan'
        },
        thumbnail: {
          url: 'https://cdn.discordapp.com/embed/avatars/0.png'
        },
        author: {
          name: user.login,
          icon_url: rawData.avatar || DiscordService.DEFAULT_AVATAR_URL
        },
        fields: [
          {
            name: 'Rank',
            value: `${rawData.rating}`,
            inline: true
          },
          {
            name: 'Statistics',
            value:
              `**Win:** ${winCount} - **Loss:** ${lossCount}\n**Win Rate:** ${winrate}%`,
            inline: true
          },
          {
            name: 'Game',
            value: `**A/D:** ${round(rawData.winsInAttack / (rawData.winsInDefense || 1), 2)}`
          }
        ]
      }
    };
  }
}

export { DiscordService };
