import { BaseCommand, Command, Message } from '../../Structures'

@Command('daily', {
    category: 'economy',
    description: 'get the daily gold',
    usage: 'daily',
    exp: 10
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        const pad = (s: number): string => (s < 10 ? '0' : '') + s
        const formatTime = (seconds: number): string => {
            const hours = Math.floor(seconds / (60 * 60))
            const minutes = Math.floor((seconds % (60 * 60)) / 60)
            const secs = Math.floor(seconds % 60)
            return `*${pad(hours)} hour(s), ${pad(minutes)} minute(s), ${pad(secs)} second(s)*`
        }
        const time = 86400000
        const { lastDaily: cd } = await this.client.DB.getUser(M.sender.jid)
        if (time - (Date.now() - cd) > 0) {
            const timeLeft = formatTime((time - (Date.now() - cd)) / 15000)
            return void M.reply(`Claim again in ${timeLeft}`)
        }
        await this.client.DB.setGold(M.sender.jid, 15000)
        await this.client.DB.user.updateOne({ jid: M.sender.jid }, { $set: { lastDaily: Date.now() } })
        return void (await M.reply('*You have claimed Your Daily 15000 Gold Check your wallet*'))
    }
}
