import { BaseCommand, Command, Message } from '../../Structures'

@Command('demote', {
    description: 'demonstrate',
    category: 'moderation',
    usage: 'demote',
    exp: 10,
    adminRequired: true,
    cooldown: 10,
   
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        if (!M.groupMetadata) return void M.reply('*Try Again!*')
        const users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        if (!users.length || users.length < 1) return void M.reply('users?')
        const mentioned = users
        let text = ''
        for (const user of users) {
            const i = users.indexOf(user)
            if (i === 0) text += '\n'
            if (user === M.groupMetadata.owner || '') {
                text += `Skipped @${user.split('@')[0]} as they're the owner`
                continue
            }
            if (!M.groupMetadata.admins?.includes(user)) {
                text += `Skipped @${user.split('@')[0]} as they're not admin`
                continue
            }
            await this.client.groupParticipantsUpdate(M.from, [user], 'demote')
            text += `Demoted: @${user.split('@')[0]}`
        }
        return void M.reply(text, 'text', undefined, undefined, undefined, mentioned)
    }
}
