import { BaseCommand, Command, Message } from '../../Structures'

@Command('deposit', {
    description: 'Deposit your gold to bank',
    usage: 'deposit',
    cooldown: 15,
    exp: 5,
    category: 'economy'
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        if (M.numbers.length < 1) return void M.reply('Specify the amount of gold to deposit')
        const { wallet } = await this.client.DB.getUser(M.sender.jid)
        if (wallet - M.numbers[0] < 0) return void M.reply(`🟥 *Check your wallet You don't have such a amount of gold*`)
        await this.client.DB.setGold(M.sender.jid, M.numbers[0], 'bank')
        await this.client.DB.setGold(M.sender.jid, -M.numbers[0])
        return void (await M.reply(`*🎉 You have transferred ${M.numbers[0]} gold to ur Bank*`))
    }
}
