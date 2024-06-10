import { BaseCommand, Message, Command } from '../../Structures'
import { IArgs } from '../../Types'

@Command('addgold', {
    description: 'adds money to all users wallet',
    aliases: ['addm'],
    category: 'dev',
    dm: true,
    usage: 'addgold <amount>',
    exp: 500
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void (await M.reply(`Please provide the amount of gold to give.`))
        const amount: any = context.split(' ')[0]
        await this.client.DB.user.find({}).exec(async (err, res) => {
            if (err) return void M.reply(`...`)
            for (let i = 0; i < res.length; i++) {
                await this.client.DB.setGold(res[i].jid, amount)
            }
            return void M.reply(`🟩 Added *${amount}* gold to *${res.length}* users wallet.`)
        })
    }
}
