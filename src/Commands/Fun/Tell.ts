import { BaseCommand, Command, Message } from '../../Structures'

@Command('tell', {
    description: 'Says the truth',
    category: 'general',
    usage: 'tell',
    aliases: ['tell'],
    exp: 25,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({ sender, reply }: Message): Promise<void> =>
        void (await reply(`*The heart that's meant to love you
will fight for you when you want to
give up, pick you up when you're
feeling down, and will give their
smile when it's hard for you to find
yours. They will NEVER get strength
from seeing you weak, power from
seeing you hurt, or joy from seeing
you cry. The heart that's meant to
love you wants to see the BEST YOU,
not the hurt you! Never forget that. In short* *${sender.username}* HE LOVE YOU SO MUCH😭😬 TRUST ME😥`))
}  
