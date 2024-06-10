import { BaseCommand, Command, Message } from '../../Structures'

@Command('baby', {
    description: 'Says baby to the bot',
    category: 'dev',
    usage: 'Love',
    aliases: ['baby,Love'],
    exp: 25,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({ sender, reply }: Message): Promise<void> =>
        void (await reply(`hellow my crush 😍 *${sender.username}* you miss me🤭👌`))
} 
