import { Command, BaseCommand, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('ban', {
    description: 'Bans/unban users',
    category: 'dev',
    cooldown: 5,
    usage: 'ban --action=[ban/unban] [tag/quote users]',
    exp: 15
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { flags }: IArgs): Promise<void> => {
        const users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        if (users.length < 1) return void M.reply('Tag or quote a user to use this command')
        flags = flags.filter((flag) => flag.startsWith('--action='))
        if (flags.length < 1)
            return void M.reply(
                `Provide the action of the ban. Example: *${this.client.config.prefix}ban --action=ban*`
            )
        const actions = ['ban', 'unban']
        const action = flags[0].split('=')[1]
        if (action === '')
            return void M.reply(
                `Provide the action of the ban. Example: *${this.client.config.prefix}ban --action=ban*`
            )
        if (!actions.includes(action.toLowerCase())) return void M.reply('Invalid action')
        let text = `🚦 *State: ${action.toLowerCase() === 'ban' ? 'BANNED' : 'UNBANNED'}*\n⚗ *Users:*\n`
        let Text = '🚦 *State: SKIPPED*\n⚗ *Users:*\n\n'
        let resultText = ''
        let skippedFlag = false
        for (const user of users) {
            const info = await this.client.DB.getUser(user)
            if (
                ((this.client.config.mods.includes(user) || info.banned) && action.toLowerCase() === 'ban') ||
                (!info.banned && action.toLowerCase() === 'unban')
            ) {
                skippedFlag = true
                Text += `*@${user.split('@')[0]}* (Skipped as this user is ${
                    this.client.config.mods.includes(user)
                        ? 'a moderator'
                        : action.toLowerCase() === 'ban'
                        ? 'already banned'
                        : 'already unbanned'
                })\n`
                continue
            }
            text += `\n*@${user.split('@')[0]}*`
            await this.client.DB.updateBanStatus(user, action.toLowerCase() as 'ban' | 'unban')
        }
        if (skippedFlag) resultText += `${Text}\n`
        resultText += text
        return void (await M.reply(resultText, 'text', undefined, undefined, undefined, users))
    }
}
