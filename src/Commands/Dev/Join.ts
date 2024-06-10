import { Command, BaseCommand, Message } from '../../Structures';
import { IArgs } from '../../Types';

@Command('join', {
    description: 'Joins a WhatsApp group using the invite link.',
    category: 'dev',
    dm: true,
    usage: '<invite_link>'
})
export default class command extends BaseCommand {
    override execute = async ({ quoted, reply }: Message, { context }: IArgs): Promise<void> => {
        if (!quoted && !context)
            return void reply(
                '🟥 *Provide the invite link next to the command or by quoting the message which has the invite link.*'
            )
        let body!: string
        if (!context) body = quoted?.content as string
        else body = context.trim()
        const URLS = this.client.utils.extractUrls(body)
        const urls = URLS.filter((url) => url.includes('chat.whatsapp.com'))
        if (!urls.length || urls.length <= 0) return void reply("Link?")
        const splittedUrl = urls[0].split('/')
        const code = splittedUrl[splittedUrl.length - 1]
        await this.client
            .groupAcceptInvite(code)
            .then(async () => await reply(`Successfully joined the group.`))
            .catch((err) => {
                console.log(err)
                return void reply(
                    "🟨 *Can't join the group, check if the invite link is valid (if it's valid then maybe i was removed)."
                )
            })
    }
 }
