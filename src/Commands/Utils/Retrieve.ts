import { BaseCommand, Command, Message } from '../../Structures'

@Command('retrieve', {
    description: 'Retrieves view once message',
    category: 'utils',
    usage: 'retrieve [quote view once message]',
    cooldown: 10,
    exp: 40
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        if (!M.quoted || M.quoted.type !== 'viewOnceMessageV2')
            return void M.reply('Quote a view once message to retrieve, Baka!')
        const buffer = await M.downloadMediaMessage(M.quoted.message)
        const type = Object.keys(M.quoted.message.viewOnceMessageV2?.message || {})[0].replace('Message', '') as
            | 'image'
            | 'video'
        return void (await M.reply(buffer, type))
    }
}
