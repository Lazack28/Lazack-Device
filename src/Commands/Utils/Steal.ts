import { proto } from '@whiskeysockets/baileys'
import { Command, Message, BaseCommand } from '../../Structures'
import { IArgs } from '../../Types'

@Command('steal', {
    description: 'Attempt to steal something.',
    category: 'utils',
    cooldown: 15,
    usage: 'steal',
    aliases: [],
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { flags, context }: IArgs): Promise<void> => {
        // Your steal command logic goes here
        M.reply('You attempted to steal something!');
    }
}
