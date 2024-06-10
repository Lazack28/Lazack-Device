import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('chatbot', {
    description: 'enable/disable private message chat bot feature.',
    category: 'dev',
    dm: true,
    usage: 'chatbot true',
    exp: 20,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void M.reply('Enable/Disable Chat Bot in private chat')
        const key = context.trim().toLowerCase()
        const action = key === 'enable'
        await this.client.DB.updateFeature('chatbot', action)
        return void M.reply(action ? '🟢 Enabled' : '🔴 Disabled')
    }
}
