import { BaseCommand, Command, Message } from '../../Structures';

@Command('cmods', {
    description: 'Get the base repo of the bot',
    category: 'general',
    aliases: ['co-mods'],
    usage: 'mods',
    cooldown: 5,
    exp: 100
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        let text: string = '';
        text += '[ 🏮Mircus-MD .𝗜𝗻𝗰 𝗖𝗼-𝗺𝗼𝗱𝘀🏮 ]\n\n';
        text += '🧙‍♂️𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲 = 𝐉𝐅𝐋𝐄𝐗 𝐎𝐆\n\n';
        text += '🌟𝗟𝗶𝗻𝗸 = wa.me/+255786535571\n\n';
        text += '🧙‍♂️𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲 = LAZACK\n\n';
        text += '🌟𝗟𝗶𝗻𝗸 = wa.me/+255734980103\n\n';
        text += '🍁𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲 = 𝐆𝐇𝐎𝐒𝐓\n\n';
        text += '🌈𝗟𝗶𝗻𝗸 (Private)\n\n';
        text += '📙𝗡𝗼𝘁𝗲 = 𝗬𝗼𝘂 𝗰𝗮𝗻 𝗰𝗼𝗻𝘁𝗮𝗰𝘁 𝗔𝗻𝘆 𝗼𝗻𝗲 𝗼𝗳 𝗼𝘂𝗿 𝗰𝗼-𝗺𝗼𝗱𝘀 𝘁𝗼 𝗮𝗱𝗱 𝘆𝗼𝘂𝗿 𝗯𝗲𝘁𝘁𝗲𝗿 𝗲𝘅𝗽𝗲𝗿𝗶𝗲𝗻𝗰𝗲 🏮❣️';

        M.reply(text);
    };
}
