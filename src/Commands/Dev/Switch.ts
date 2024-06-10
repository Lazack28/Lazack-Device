import { IArgs } from '../../Types'
import { Command, BaseCommand, Message } from '../../Structures'

@Command('switch', {
    description: 'Switches bot of a group',
    usage: 'swtich [bot_name]',
    cooldown: 10,
    exp: 10,
    category: 'dev'
})
export default class command extends BaseCommand {
    override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        const { bot } = await this.client.DB.getGroup(M.from)
        const options = ['all', 'everyone', 'bots']
        let Bot!: string
        if (!context || options.includes(context.trim().toLowerCase().split(' ')[0].trim())) Bot = 'all'
        else Bot = context.trim().split(' ')[0].trim()
        const name = this.client.config.name.split(' ')[0]
        if (Bot === bot)
            return void M.reply(
                `🟨 ${Bot === 'all' ? '*Everyone* is' : Bot === name ? 'I am' : `*${Bot}* is`} already active`
            )
        await this.client.DB.updateGroup(M.from, 'bot', Bot)
        return void M.reply(
            `🟩 ${Bot === name ? 'I am' : Bot === 'all' ? '*Everyone* is' : `*${Bot}* is`} active from now on`
        )
    }
}


