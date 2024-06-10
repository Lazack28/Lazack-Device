import { BaseCommand, Command, Message } from '../../Structures'

@Command('purge', {
    description: 'destroy a group',
    category: 'moderation',
    exp: 5,
    cooldown: 5,
    adminRequired: true,
    usage: 'purge',
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        if (!M.groupMetadata) return void M.reply('*Try Again!*')
        const { participants, owner } = M.groupMetadata
        if (M.sender.jid !== owner) return void M.reply('only owner')
        if (this.purgeSet.has(M.from)) {
            const arr = participants.map((participant) => participant.id)
            if (arr.includes(owner as string)) arr.splice(arr.indexOf(owner as string), 1)
            await this.client
                .groupParticipantsUpdate(M.from, arr, 'remove')
                .then(async () => {
                    M.reply('Done')
                    this.purgeSet.delete(M.from)
                    return void (await this.client.groupLeave(M.from))
                })
                .catch(() => {
                    return void M.reply('*Try Again*')
                })
        }
        this.purgeSet.add(M.from)
        M.reply('Are you sure? DO it again to proceed')
        setTimeout(() => {
            if (!this.purgeSet.has(M.from)) return void null
            this.purgeSet.delete(M.from)
        }, 6 * 1000)
    }

    private purgeSet = new Set<string>()
}
