import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('me', {
    description: 'Sends pfp of user/group',
    category: 'utils',
    usage: 'getpfp | getpfp --group',
    cooldown: 5,
    aliases: ['pfp', 'icon'],
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) {
            const users = M.mentioned
            if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
            while (users.length < 1) users.push(M.sender.jid)
            const weeb = users[0]
            let pp: string | undefined
            try {
                pp = await this.client.profilePictureUrl(weeb, 'image')
            } catch {
                pp = undefined
            }
            const img = pp ? await this.client.utils.getBuffer(pp) : (this.client.assets.get('404') as Buffer)
            return void (await M.reply(img, 'image'))
        }
        const group = context.trim().split(' ')
        if (group[0] === '--group' || group[0] === '--gc') {
            let pp: string | undefined
            try {
                pp = await this.client.profilePictureUrl(M.from, 'image')
            } catch {
                pp = undefined
            }
            const img = pp ? await this.client.utils.getBuffer(pp) : (this.client.assets.get('404') as Buffer)
            return void M.reply(img, 'image')
        }
    }
}
