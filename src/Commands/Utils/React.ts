import { Message, Command, BaseCommand } from '../../Structures'

@Command('react', {
    category: 'utils',
    description: 'Reacts a message with the given emoji',
    usage: 'react [emoji] || react [emoji] [quote a message]',
    cooldown: 5,
    exp: 10
})
export default class extends BaseCommand {
    public override execute = async ({ react, reply, quoted, emojis, message }: Message): Promise<void> => {
        if (!emojis.length) return void reply('Provide an emoji to react')
        const key = quoted ? quoted.key : message.key
        return void (await react(emojis[0], key))
    }
}
