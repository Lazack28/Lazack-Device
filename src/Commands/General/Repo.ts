import { BaseCommand, Command, Message } from '../../Structures';

@Command('repo', {
    description: 'Get the base repo of the bot',
    category: 'general',
    aliases: ['script'],
    usage: 'repo',
    cooldown: 5,
    exp: 100
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        let text = '';
        text += '*━━━❰ 𝐌𝐀𝐑𝐈𝐀-𝐁𝐎𝐓 ❱━━━*\n\n';
        text += '⚜𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: An anime themed WhatsApp bot based on multi device(MD).\n\n';
        text += '🚥𝗦𝘁𝗮𝘁𝘂𝘀: Bot in development stage.\n\n';
        text += '🧩𝗛𝗶𝗻𝘁: The bot is not an open source project, therefore you can deploy a version of it;\n';
        text += '(nowhere coz its not online)\n\n';
        text += '⭐𝗜𝗻𝗳𝗼: This bot is using a base of WhatsApp-bot, we therefore don\'t have any copyright or either affiliated with WhatsApp-bot anyhowly. Thanks to Lucky Yambem for base bot.\n';
        text += '(https://github.com/Dkhitman3/Hitman47)\n\n';
        text += '📃𝗟𝗶𝗰𝗲𝗻𝘀𝗲: You may obtain a copy of the License at;\n';
        text += 'http://www.gnu.org/licenses/\n\n';
        text += '(𝗚𝗡𝗨 𝗔𝗙𝗙𝗘𝗥𝗢 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 𝗣𝗨𝗕𝗟𝗜𝗖 𝗟𝗜𝗖𝗘𝗡𝗦𝗘).\n';
        text += '»𝖵𝖾𝗋𝗌𝗂𝗈𝗇 3.0';

        M.reply(text);
    };
}
