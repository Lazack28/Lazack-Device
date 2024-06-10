import { BaseCommand, Command, Message } from '../../Structures'

@Command('mircus', {
    description: 'Call Jflex bot',
    category: 'general',
    usage: 'maria',
    aliases: ['mircus'],
    exp: 25,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({ sender, reply }: Message): Promise<void> =>
        void (await reply(`*Fuck u*`))
} 
