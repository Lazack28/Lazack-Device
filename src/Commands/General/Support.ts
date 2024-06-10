import { BaseCommand, Command, Message } from '../../Structures';

interface CustomMessageContent {
    text: string;
    footer: string;
    headerType?: number; 
}

@Command('support', {
    description: 'gives the group links of support',
    usage: 'support',
    category: 'general', 
    exp: 10,
    dm: true,
    cooldown: 20
})
export default class SupportCommand extends BaseCommand {
    public override execute = async ({ from, sender, message }: Message): Promise<void> => {
        const supportText = `*━━━❰ 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐆𝐂𝐒 ❱━━━*\n\n
        *#1* *『𝐁𝐎𝐓'𝐒 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐆𝐂™®❤‍🩹』*
        [ https://chat.whatsapp.com/F3of2SWWzlECNL9Trc0OM0 ]
       
        *#2*  『*FOR MARIA BOT'S ONLY🤭🤖』*
        [ https://chat.whatsapp.com/GzGujVKqujeGo6Y1xqJk1W ]

        *#3* *『❤️𝐖𝐄𝐄𝐁𝐒❤️』*
        [ https://chat.whatsapp.com/IEJrKqgWuEyEycPEifGU1C ]

        *#4* *『°𝕻-ß𝖔𝖙•𝕽𝖔𝖇𝖔𝖙°🤖』*
        [ https://chat.whatsapp.com/HfDrgRKpcWMHf0rJmWY4DL ] 
        \nᚖ here Enjoy 😎🤭 ᚖ
        *©𝐌𝐀𝐑𝐈𝐀-𝐁𝐎𝐓 🤭 Inc*`;

        const footerText = '© Maria Inc 2024';

        const messageContent: CustomMessageContent = {
            text: supportText,
            footer: footerText,
            headerType: 1
        };

        // Send the message directly to the user's DM
        return void (await this.sendDirectMessage(sender.jid, messageContent, { quoted: message }));
    }

    private async sendDirectMessage(userJID: string, content: CustomMessageContent, options: any): Promise<void> {
        try {
            // Send the message to the user's DM
            await this.client.sendMessage(userJID, content, options);
        } catch (error) {
            console.error('Error sending direct message:', error);
        }
      }
}
