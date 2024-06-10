import { Message, Command, BaseCommand } from '../../Structures'

@Command('forfeit-chess', {
    description: 'forfeit chess match',
    usage: 'forfeit-chess',
    exp: 5,
    cooldown: 5,
    category: 'games'
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const ch = this.handler.chess.challenges.get(M.from)
        if (!ch || !Object.values(ch).includes(M.sender.jid) || !this.handler.chess.ongoing.has(M.from))
            return void M.reply('no ongoing chess match for u in this group')
        await this.client.utils.endChess(
            this.handler,
            this.client,
            M.from,
            Object.values(ch).filter((x) => x !== M.sender.jid)[0]
        )
        return void (await M.reply('you forfeitted'))
    }
}
