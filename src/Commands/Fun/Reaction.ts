import { Command, BaseCommand, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { Reaction, Reactions, reaction } from '../../lib'

const reactions = Object.keys(Reactions)

@Command('reaction', {
    description: 'React via anime gifs with the tagged or quoted user',
    category: 'fun',
    cooldown: 10,
    exp: 20,
    usage: 'reaction (reaction) [tag/quote user] || (reaction) [tag/quote user]',
    aliases: ['r', ...reactions]
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        const command = M.content.split(' ')[0].toLowerCase().slice(this.client.config.prefix.length).trim()
        let flag = true
        if (command === 'r' || command === 'reaction') flag = false
        if (!flag && !context)
            return void M.reply(
                `💫 *Available Reactions:*\n\n- ${reactions
                    .sort((x, y) => (x < y ? -1 : x > y ? 1 : 0))
                    .map((reaction) => this.client.utils.capitalize(reaction))
                    .join('\n- ')}\n\n🔗 *Usage:* ${this.client.config.prefix}reaction (reaction) [tag/quote user] | ${
                    this.client.config.prefix
                }(reaction) [tag/quote user]\nExample: ${this.client.config.prefix}pat`
            )
        const reaction = (flag ? command : context.split(' ')[0].trim().toLowerCase()) as reaction
        if (!flag && !reactions.includes(reaction))
            return void M.reply(
                `Invalid reaction. Use *${this.client.config.prefix}react* to see all of the available reactions`
            )
        const users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        while (users.length < 1) users.push(M.sender.jid)
        const reactant = users[0]
        const single = reactant === M.sender.jid
        const { url, words } = await new Reaction().getReaction(reaction, single)
        return void (await M.reply(
            await this.client.utils.gifToMp4(await this.client.utils.getBuffer(url)),
            'video',
            true,
            undefined,
            `*@${M.sender.jid.split('@')[0]} ${words} ${single ? 'Themselves' : `@${reactant.split('@')[0]}`}*`,
            [M.sender.jid, reactant]
        ))
    }
}
