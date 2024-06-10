import { BaseCommand, Command, Message } from '../../Structures'

@Command('give', {
    category: 'economy',
    description: 'give your friends gold',
    usage: '',
    exp: 25,
    cooldown: 35
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        const users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        if (!users.length || users.length < 0) return void M.reply('Tag or quote a user to give')
        if (users[0] === M.sender.jid) return void M.reply('tag someone')
        if (M.numbers.length < 1) return void M.reply(`amount?`)
        const user = users[0]
        const { wallet } = await this.client.DB.getUser(M.sender.jid)
        const amount = M.numbers[0]
        if (wallet - amount < 0) return void M.reply(`🟥 *Check ur wallet*`)
        await this.client.DB.setGold(M.sender.jid, -amount)
        await this.client.DB.setGold(user, amount)
        return void M.reply(
            `Whaooao You gave *🪙${amount} gold* to @${user.split('@')[0]}`,
            'text',
            undefined,
            undefined,
            undefined,
            [M.sender.jid, user]
        )
    }
}
