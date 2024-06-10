import { Command, BaseCommand, Message } from '../../Structures'

@Command('challenge', {
    description: 'challenge someone for chess',
    usage: 'challenge',
    category: 'games',
    cooldown: 10,
    exp: 20
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        if (this.handler.chess.ongoing.has(M.from)) return void M.reply('a chess match ongoing atm for this group')
        let users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        users = users.filter((x) => x !== M.sender.jid)
        if (!users.length) return void M.reply('tag or quote someone to play with')
        const user = users[0]
        this.handler.chess.challenges.set(M.from, { challenger: M.sender.jid, challengee: user })
        return void (await M.reply(
            `@${M.sender.jid.split('@')[0]} has Challenged @${user.split('@')[0]} to a chess match. Use *${
                this.client.config.prefix
            }accept-ch* to start the challenge`,
            'text',
            undefined,
            undefined,
            undefined,
            [M.sender.jid, user]
        ))
    }
}
