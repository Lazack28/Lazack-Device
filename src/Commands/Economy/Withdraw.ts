import { BaseCommand, Command, Message } from '../../Structures'

@Command('withdraw', {
    description: 'withdarw gold from your bank',
    usage: '',
    cooldown: 15,
    exp: 5,
    category: 'economy'
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        if (M.numbers.length < 1) return void M.reply('amount?')
        const { bank } = await this.client.DB.getUser(M.sender.jid)
        if (bank - M.numbers[0] < 0) return void M.reply(`🟥 *check ur bank*`)
        await this.client.DB.setGold(M.sender.jid, -M.numbers[0], 'bank')
        await this.client.DB.setGold(M.sender.jid, M.numbers[0])
        const text = `*🟩 You withdrew ${M.numbers[0]} coins🪙 to ur wallet*`
        return void (await M.reply(text))
    }
}
