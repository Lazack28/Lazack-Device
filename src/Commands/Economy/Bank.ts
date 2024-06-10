import { BaseCommand, Command, Message } from '../../Structures'

@Command('bank', {
    description: '',
    usage: 'bank',
    category: 'economy',
    exp: 10,
    cooldown: 100
})
export default class command extends BaseCommand {
    override execute = async ({ reply, sender }: Message): Promise<void> => {
        const { bank } = await this.client.DB.getUser(sender.jid)
        const text = `🏦 *Bank* | *${sender.username}*\n\n🪙 *coin: ${bank}*`
        return void (await reply(text))
    }
}
