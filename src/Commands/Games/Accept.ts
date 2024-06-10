import CIG from 'chess-image-generator-ts'
import Game from 'chess-node'
import EventEmitter from 'events'
import { Message, Command, BaseCommand } from '../../Structures'

@Command('accept-ch', {
    description: 'accept chess challenge',
    category: 'games',
    exp: 10,
    cooldown: 10,
    usage: 'accept-ch'
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const print = (msg: string) => {
            if (msg === 'Invalid Move' || msg === 'Not your turn') return void M.reply(msg)
            this.client.sendMessage(M.from, {
                text: msg
            })
            if (msg.includes('stalemate')) return void this.client.utils.endChess(this.handler, this.client, M.from)
            if (msg.includes('wins')) {
                const winner = msg.includes('Black wins') ? 'Black' : 'White'
                return void this.client.utils.endChess(this.handler, this.client, M.from, winner)
            }
        }
        const ch = this.handler.chess.challenges.get(M.from)
        if (!ch || ch.challengee !== M.sender.jid) return void M.reply('no one challenged u')
        if (this.handler.chess.ongoing.has(M.from)) return void M.reply('ongoing')
        this.handler.chess.ongoing.add(M.from)
        const game = new Game(new EventEmitter(), M.from)
        await M.reply(
            `*Chess Game Started!*\n\n⬜ *White:* @${ch.challenger.split('@')[0]}\n⬛ *Black:* @${
                ch.challengee.split('@')[0]
            }`,
            'text',
            undefined,
            undefined,
            undefined,
            Object.values(ch)
        )
        game.start(print, ch.challenger, ch.challengee, async () => {
            const cig = new CIG()
            cig.loadArray(this.client.utils.parseChessBoard(game.board.getPieces(game.white, game.black)))
            let sent = false
            while (!sent) {
                try {
                    await cig.generateBuffer().then(
                        async (data) =>
                            await this.client.sendMessage(M.from, {
                                image: data
                            })
                    )
                    sent = true
                } catch (err) {
                    continue
                }
            }
        })
        return void this.handler.chess.games.set(M.from, game)
    }
} 
