import { BaseCommand, Command, Message } from '../../Structures';

interface CustomMessageContent {
    text: string;
    footer: string;
    headerType?: number; 
}

@Command('owner', {
    description: 'owner of 𝐉 - 𝐁𝐎𝐓🤭',
    usage: 'owner',
    category: 'general',
    exp: 10,
    cooldown: 10
})
export default class command extends BaseCommand {
    override execute = async ({ from, sender, message }: Message): Promise<void> => {
        const faqText = `*🌹OWNER OF Mircus-md*\n\n🧙‍♂️ Contact: 𝐉𝐅𝐋𝐄𝐗 𝐎𝐆❤‍🔥\n\n🔗 *https://wa.me/255786535571*\n\n🧙‍♂️ Contact: LAZACK❤‍🔥\n\n🔗 *https://wa.me/255734980103*`;
 `;
Mircus-md*\n\n
        const footerText = '© Hitman47 Inc 2024';

        const messageContent: CustomMessageContent = {
            text: faqText,
            footer: footerText,
            headerType: 1
        };

        return void (await this.client.sendMessage(from, messageContent, {
            quoted: message
        }));
    }
}
