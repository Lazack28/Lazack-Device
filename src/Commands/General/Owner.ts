import { Message, Command, BaseCommand } from '../../Structures';

@Command('mods', {
    description: "Displays the bot's moderators",
    exp: 20,
    cooldown: 5,
    dm: true,
    category: 'general',
    usage: 'mods',
    aliases: ['mod', 'owner', 'moderators']
})
export default class ModsCommand extends BaseCommand {
    public override execute = async ({ reply }: Message): Promise<void> => {
        if (!this.client.config.mods.length) {
            return void reply('No moderators found.');
        }

        let text = `🛡️ *${this.client.config.name} Moderators* \n\n`;
        this.client.config.mods.forEach((moderator, index) => {
            const username = this.client.contact.getContact(moderator).username;
            const contactLink = `https://wa.me/+${moderator.split('@')[0]}`;
            
            text += `*#${index + 1}*\n👤 *Username:* ${username}\n📞 *Contact:* [Contact Moderator](${contactLink})\n\n`;
        });

        return void (await reply(text));
    }
}
