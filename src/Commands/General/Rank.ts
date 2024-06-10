import { Rank } from 'canvacord'
import { getStats } from '../../lib'
import { BaseCommand, Command, Message } from '../../Structures'

@Command('rank', {
    description: "Displays user's rank",
    category: 'general',
    exp: 20,
    cooldown: 10,
    aliases: ['card'],
    usage: 'rank [tag/quote user]'
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        while (users.length < 1) users.push(M.sender.jid)
        const user = users[0]
        const username = user === M.sender.jid ? M.sender.username : this.client.contact.getContact(user).username
        let pfpUrl: string | undefined
        try {
            pfpUrl = await this.client.profilePictureUrl(user, 'image')
        } catch {
            pfpUrl = undefined
        }
        const pfp = pfpUrl ? await this.client.utils.getBuffer(pfpUrl) : (this.client.assets.get('404') as Buffer)
        const { experience, level, tag } = await this.client.DB.getUser(user)
        const { requiredXpToLevelUp, rank } = getStats(level)
        const card = await new Rank()
            .setAvatar(pfp)
            .setLevel(1, '', false)
            .setCurrentXP(experience)
            .setRequiredXP(requiredXpToLevelUp)
            .setProgressBar(this.client.utils.generateRandomHex())
            .setDiscriminator(tag, this.client.utils.generateRandomHex())
            .setUsername(username, this.client.utils.generateRandomHex())
            .setBackground('COLOR', this.client.utils.generateRandomHex())
            .setRank(1, '', false)
            .renderEmojis(true)
            .build({ fontX: 'arial', fontY: 'arial' })
        return void (await M.reply(
            card,
            'image',
            undefined,
            undefined,
            `🏮 *Username:* ${username}#${tag}\n\n🌟 *Experience: ${experience} / ${requiredXpToLevelUp}*\n\n🥇 *Rank:* ${rank}\n\n🍀 *Level:* ${level}`
        ))
    }
}
