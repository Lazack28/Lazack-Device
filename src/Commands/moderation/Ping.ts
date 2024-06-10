import { Command, BaseCommand, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('ping', {
    description: 'Tags all of the members in a group',
    usage: 'ping (--tags=hidden)',
    category: 'moderation',
    exp: 35,
    adminRequired: true,
    cooldown: 15,
    aliases: ['all', 'tagall', 'everyone']
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { flags, context }: IArgs): Promise<void> => {
        if (!M.groupMetadata) return void M.reply('*Try Again!*')
        const hidden = this.getPingOptions(flags)
        flags.forEach((flag) => (context = context.replace(flag, '')))
        const message = context ? context.trim() : M.quoted ? M.quoted.content : ''
        let text = `${message !== '' ? `🧧 *Message: ${message}*\n\n` : ''}😻 *Group:* ${
            M.groupMetadata.subject
        }\n👥 *Members:* ${M.groupMetadata.participants.length}\n🧧 *Tagger: @${
            M.sender.jid.split('@')[0]
        }*\n📧 *Tags:* ${hidden ? '*[HIDDEN]*' : '\n'}`
        const botJid = this.client.correctJid(this.client.user?.id || '')
        if (!hidden) {
            text += `\n🤖 *@${botJid.split('@')[0]}*`
            const mods: string[] = []
            const admins: string[] = []
            const members: string[] = []
            for (const jid of M.groupMetadata.participants.map((x) => x.id)) {
                if (jid === M.sender.jid || jid === botJid) continue
                if (this.client.config.mods.includes(jid)) {
                    mods.push(jid)
                    continue
                }
                if (M.groupMetadata.admins?.includes(jid)) {
                    admins.push(jid)
                    continue
                }
                members.push(jid)
            }
            for (let i = 0; i < mods.length; i++) text += `${i === 0 ? '\n\n' : '\n'}❤️ *@${mods[i].split('@')[0]}*`
            for (let i = 0; i < admins.length; i++) text += `${i === 0 ? '\n\n' : '\n'}🌹 *@${admins[i].split('@')[0]}*`
            for (let i = 0; i < members.length; i++)
                text += `${i === 0 ? '\n\n' : '\n'}🧧 *@${members[i].split('@')[0]}*`
        }
        return void (await M.reply(
            text,
            'text',
            undefined,
            undefined,
            undefined,
            M.groupMetadata.participants.map((x) => x.id)
        ))
    }

    private getPingOptions = (flags: string[]): boolean => {
        if (!flags.length) return false
        const taggingFlags = flags.filter((flag) => flag.startsWith('--tags='))
        let hidden = false
        if (taggingFlags.length && taggingFlags[0].split('=')[1].toLowerCase().includes('hidden')) hidden = true
        return hidden
    }
}
