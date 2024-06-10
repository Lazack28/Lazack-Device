import { BaseCommand, Command, Message } from '../../Structures';

interface CustomMessageContent {
    text: string;
    footer: string;
    headerType?: number; 
}

@Command('rules', {
    description: 'your support to avoid the following things to get bann to use MARIA-BOT🤭',
    usage: 'rules',
    category: 'general',
    exp: 10,
    cooldown: 10
})
export default class command extends BaseCommand {
    override execute = async ({ from, sender, message }: Message): Promise<void> => {
        const faqText = ` ☞☛✰✬★✰──🎀𝚁𝚞𝚕𝚎𝚜⌉ 🎀──✾✵✫✯☚☜ \n\n

☟☟☟☟

➸ Don't neither ask for the Bot Script or to be the Mod/Owner it's illegal🚫

➸ Use &support to get the Official group link in your DM

➸ If you want to chat with Star you can use *&chat (your text)* both are different AI Chat Bots

➸ If you want to add Star Chan in your group the contact the owner by *&owner/&mods* 

➸ Dont use wrong command, use the command given in the *help list* 

➸ Dont spam the bot with commands if the bot is not responding, its means the bot maybe offline or facing Internet issues. 

➸ Dont DM the Bot 

➸ If You Don't follow the Rules You will be Banned 🚫 soon 

2.𝖠𝗏𝗈𝗂𝖽 𝖺𝗌𝗄𝗂𝗇𝗀 𝗍𝗁𝖾 𝖻𝗈𝗍 𝖺𝗇𝗒 𝗂𝗇𝗌𝗎𝗅𝗍𝗌/𝗇𝗎𝖽𝗂𝗍𝗒 𝖼𝗈𝗇𝗍𝖾𝗇𝗍.(𝖡𝖺𝗇)

3.𝖠𝗏𝗈𝗂𝖽 𝖼𝗁𝖺𝗍𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝖻𝗈𝗍 𝗂𝗇 𝗉𝖾𝗋𝗌𝗈𝗇𝖺𝗅 𝗆𝖾𝗌𝗌𝖺𝗀𝖾, 𝖮𝖭𝖫𝖸 𝗀𝗋𝗈𝗎𝗉 𝗅𝗂𝗇𝗄𝗌 𝖺𝗅𝗅𝗈𝗐𝖾𝖽.(𝖡𝗅𝗈𝖼𝗄)

4.Don't send GROUP LINKS

5.𝖴𝗌𝖾 #𝗌𝗎𝗉𝗉𝗈𝗋𝗍
\nᚖ ────── ✪ ────── ᚖ`;

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
